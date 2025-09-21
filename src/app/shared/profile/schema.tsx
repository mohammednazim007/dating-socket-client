import * as Yup from "yup";
// ✅ Yup Schema
const profileSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  currentPassword: Yup.string(),
  newPassword: Yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), ""],
    "Passwords must match"
  ),
});
