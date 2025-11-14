// import { OtpInputProps } from "@/app/types/auth";
// import { FC } from "react";

// const OtpInput: FC<OtpInputProps> = ({
//   value,
//   onChange,
//   onKeyDown,
//   inputRef,
//   isFocused,
//   onFocus,
// }) => (
//   <input
//     type="text"
//     inputMode="numeric"
//     maxLength={1}
//     value={value}
//     ref={inputRef}
//     onChange={(e) => onChange(e.target.value)}
//     onKeyDown={onKeyDown}
//     onFocus={onFocus}
//     className={`w-12 h-16 text-center text-3xl font-bold rounded-lg border-2
//       ${
//         isFocused
//           ? "border-lime-500 ring-2 ring-lime-500/50"
//           : "border-slate-600"
//       }
//       bg-slate-700 text-white focus:outline-none transition duration-150 ease-in-out shadow-md`}
//     style={{ caretColor: "lime" }}
//   />
// );

// export default OtpInput;
import { OtpInputProps } from "@/app/types/auth";
import { FC } from "react";
import { motion } from "motion/react";

const OtpInput: FC<OtpInputProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
  isFocused,
  onFocus,
}) => (
  <motion.input
    type="text"
    inputMode="numeric"
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
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.25 }}
  />
);

export default OtpInput;
