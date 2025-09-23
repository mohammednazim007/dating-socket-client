import * as Yup from "yup";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

export const profileSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  currentPassword: Yup.string(),
  newPassword: Yup.string().when("currentPassword", {
    is: (val: string | undefined) => !!val && val.length > 0,
    then: (schema) =>
      schema
        .required("New password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(
          passwordRegex,
          "Password must contain at least one uppercase letter and one number"
        ),
    otherwise: (schema) => schema,
  }),
  confirmPassword: Yup.string().when("newPassword", {
    is: (val: string | undefined) => !!val && val.length > 0,
    then: (schema) =>
      schema
        .required("Confirm password is required")
        .oneOf([Yup.ref("newPassword")], "Passwords must match"),
    otherwise: (schema) => schema,
  }),
});
