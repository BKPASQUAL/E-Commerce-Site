import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter The Email")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Enter The Password"),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted:", values); // Log form data
    },
  });

  return (
    <div className="w-full min-h-screen flex justify-center bg-slate-100 items-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-8">
        {/* Logo */}
        <div className="text-center text-4xl font-extrabold text-gray-800 mb-4">
          ShoesMart
        </div>
        {/* Login Header */}
        <div className="text-center text-2xl font-bold text-gray-700 mb-6">
          Log In
        </div>
        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-6">
          {/* Email Field */}
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            autoComplete="off"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          {/* Password Field */}
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            autoComplete="off"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          {/* Submit Button */}
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
              height: "48px",
              borderRadius: "8px",
            }}
          >
            Sign In
          </Button>
        </form>
        {/* Footer */}
        <div className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <a
            href="/SignUp"
            className="text-blue-600 font-semibold hover:underline"
          >
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
