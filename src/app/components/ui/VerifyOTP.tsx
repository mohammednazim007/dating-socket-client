"use client";
import React, {
  useState,
  useRef,
  KeyboardEvent,
  RefObject,
  FC,
  createRef,
} from "react";
import { motion } from "motion/react";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
  isFocused: boolean;
}

const OtpInput: FC<OtpInputProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
  isFocused,
  onFocus,
}) => (
  <input
    type="text"
    maxLength={1}
    value={value}
    ref={inputRef}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={onKeyDown}
    onFocus={onFocus}
    className={`w-12 h-16 text-center text-3xl font-bold rounded-lg border-2 
      ${
        isFocused
          ? "border-lime-500 ring-2 ring-lime-500/50"
          : "border-slate-600"
      } 
      bg-slate-700 text-white focus:outline-none transition duration-150 ease-in-out shadow-md`}
    style={{ caretColor: "lime" }}
  />
);

const VerifyOTP: FC = () => {
  const length = 6;
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [loading, setLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const inputRefs = useRef(
    [...Array(length)].map(() => createRef<HTMLInputElement>())
  );

  const focusInput = (index: number) => {
    inputRefs.current[index]?.current?.focus();
    setFocusedIndex(index);
  };

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) focusInput(index + 1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      return focusInput(index - 1);
    if (e.key === "ArrowRight" && index < length - 1)
      return focusInput(index + 1);
    if (e.key === "ArrowLeft" && index > 0) return focusInput(index - 1);
  };

  const handleVerify = async () => {
    if (otp.some((d) => !d)) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    console.log(`Verifying OTP: ${otp.join("")}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-sm flex flex-col items-center"
      >
        {/* Heading */}
        <h2 className="text-2xl font-bold mb-2 text-white">Enter OTP Code</h2>

        {/* Subtext */}
        <p className="text-xs text-center text-slate-400 mb-8 max-w-[200px]">
          Please enter the 6-digit code sent to your email address.
        </p>

        {/* OTP Inputs */}
        <div className="flex space-x-2 mb-8">
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

        {/* Resend Button */}
        <button
          onClick={() => console.log("Resending OTP...")}
          className="text-sm font-semibold text-slate-300 hover:text-white mb-6 transition duration-150"
          disabled={loading}
        >
          Resend Code
        </button>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading || otp.some((d) => !d)}
          className="w-full py-3 rounded-xl font-bold text-white bg-lime-500 hover:bg-lime-700 disabled:bg-gray-400 disabled:text-slate-800 transition"
        >
          {loading ? "Verifying..." : "Verify Code"}
        </button>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;
