import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Button, Divider } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last Name is required")
    .min(2, "Last Name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    localStorage.setItem("signupData", JSON.stringify(values));

    Swal.fire({
      icon: "success",
      title: "Sign Up Successful!",
      text: "Your account has been created successfully.",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      navigate("/login");
      resetForm();
      setSubmitting(false);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-800">
          Create Your Account
        </h2>
        <Divider sx={{ mb: 4, mt: 2 }} />
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="flex flex-col space-y-4" autoComplete="off">
              <Field
                as={TextField}
                name="firstName"
                label="First Name"
                variant="outlined"
                autoComplete="off"
                fullWidth
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
              <Field
                as={TextField}
                name="lastName"
                label="Last Name"
                variant="outlined"
                autoComplete="off"
                fullWidth
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
              <Field
                as={TextField}
                name="email"
                label="Email"
                variant="outlined"
                autoComplete="off"
                fullWidth
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                autoComplete="off"
                fullWidth
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Field
                as={TextField}
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                autoComplete="off"
                fullWidth
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                  width: "100%",
                  height: "40px",
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </Button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-6 text-sm md:text-base">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Log In
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
