import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: (values) => {
      const storedData = JSON.parse(localStorage.getItem("signupData"));

      if (storedData) {
        const { email, password } = storedData;

        if (values.email === email && values.password === password) {
          navigate("/");
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Welcome to ShoesMart!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed!",
            text: "Invalid email or password. Please try again.",
            showConfirmButton: true,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "No Account Found",
          text: "Please sign up first.",
          showConfirmButton: true,
        });
      }
    },
  });

  return (
    <div className="w-full min-h-screen flex justify-center bg-slate-100 items-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-8">
        <div className="text-center text-4xl font-extrabold text-gray-800 mb-4">
          ShoesMart
        </div>
        <div className="text-center text-2xl font-bold text-gray-700 mb-6">
          Log In
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col space-y-6"
        >
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
