"use client";
import React, {
  useState,
  useRef,
  KeyboardEvent,
  FC,
  createRef,
  useCallback,
} from "react";
import { motion } from "motion/react";
import { useOtpTimer } from "@/app/hooks/useOtpTimer";
import toast from "react-hot-toast";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/app/redux/features/authApi/authApi";
import { useRouter } from "next/navigation";
import ButtonIndicator from "@/app/shared/buttonIndicator/ButtonIndicator";
import OtpInput from "@/app/shared/OtpInput/OtpInput";

const VerifyOTP: FC = () => {
  const OTP_LENGTH = 6;
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(0);

  const [sendOtp, { isLoading: isResending }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();

  const { timeLeft, resetTimer, formatTime } = useOtpTimer(300);

  const inputRefs = useRef(
    Array.from({ length: OTP_LENGTH }, () => createRef<HTMLInputElement>())
  );

  // ✅ Helpers
  const focusInput = useCallback((index: number) => {
    inputRefs.current[index]?.current?.focus();
    setFocusedIndex(index);
  }, []);

  const handleChange = useCallback(
    (value: string, index: number) => {
      if (!/^\d?$/.test(value)) return;

      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < OTP_LENGTH - 1) focusInput(index + 1);
    },
    [otp, focusInput]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace" && !otp[index] && index > 0)
        return focusInput(index - 1);
      if (e.key === "ArrowRight" && index < OTP_LENGTH - 1)
        return focusInput(index + 1);
      if (e.key === "ArrowLeft" && index > 0) return focusInput(index - 1);
    },
    [otp, focusInput]
  );

  // ✅ Verify OTP
  const handleVerify = useCallback(async () => {
    if (otp.some((d) => !d)) return;

    const email = localStorage.getItem("resetEmail");
    if (!email) return toast.error("No email found. Please register again.");

    try {
      const response = await verifyOtp({
        email,
        otpCode: otp.join(""),
      }).unwrap();

      if (response.success) {
        toast.success("OTP verified successfully!");
        router.push("/auth/change-password");
      } else {
        toast.error(response.message || "OTP verification failed.");
      }
    } catch (err: unknown) {
      const apiError = err as { data?: { message?: string } };
      toast.error(apiError.data?.message || "OTP verification failed.");
    }
  }, [otp, verifyOtp, router]);

  // ✅ Resend OTP
  const handleResend = useCallback(async () => {
    if (timeLeft > 0) return;

    const email = localStorage.getItem("rememberedEmail");
    if (!email) return toast.error("Email not found. Please register again.");

    try {
      await sendOtp({ email }).unwrap();
      toast.success("OTP resent successfully!");
      resetTimer();
      setOtp(Array(OTP_LENGTH).fill(""));
      focusInput(0);
    } catch (err: unknown) {
      const apiError = err as { data?: { message?: string } };
      toast.error(apiError.data?.message || "OTP resend failed.");
    }
  }, [sendOtp, timeLeft, resetTimer, focusInput]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.4 }}
        className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-sm flex flex-col items-center"
      >
        <h2 className="text-2xl font-bold mb-2 text-white">Enter OTP Code</h2>
        <p className="text-xs text-center text-slate-400 mb-8 max-w-[200px]">
          Please enter the 6-digit code sent to your email address.
        </p>

        <div className="flex space-x-2 mb-6">
          {otp.map((digit, i) => (
            <OtpInput
              key={i}
              value={digit}
              onChange={(val) => handleChange(val, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              inputRef={inputRefs.current[i]}
              isFocused={i === focusedIndex}
              onFocus={() => setFocusedIndex(i)}
            />
          ))}
        </div>

        {/* Timer & Resend */}
        <p className="text-sm text-slate-400 mb-3">
          {timeLeft > 0 ? (
            <>
              Resend available in{" "}
              <span className="text-lime-400 font-semibold">
                {formatTime(timeLeft)}
              </span>
            </>
          ) : (
            <span className="text-lime-400 font-semibold">
              You can resend now
            </span>
          )}
        </p>

        <button
          onClick={handleResend}
          disabled={timeLeft > 0 || isResending}
          className={`text-sm font-semibold mb-6 transition duration-150 ${
            timeLeft > 0
              ? "text-slate-500 cursor-not-allowed"
              : "text-lime-400 hover:text-lime-300"
          }`}
        >
          Resend Code
        </button>

        <button
          onClick={handleVerify}
          disabled={isVerifying || otp.some((d) => !d)}
          className="w-full py-3 rounded-xl font-bold text-white bg-lime-500 hover:bg-lime-600 disabled:bg-gray-400 disabled:text-slate-800 transition"
        >
          {isVerifying ? (
            <ButtonIndicator width={11} height={11} />
          ) : (
            "Verify Code"
          )}
        </button>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;
