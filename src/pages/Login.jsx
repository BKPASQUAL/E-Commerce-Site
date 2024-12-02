import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function Login() {
  return (
    <div className="w-full h-screen bg-slate-300 flex justify-center items-center">
      <div className="bg-white w-1/4 h-3/5 rounded-lg	 p-6">
        <div> LogIn</div>
        <div className="flex flex-col space-y-8">
          <TextField
            color="#fff"
            id="outlined-basic"
            label="User Name"
            variant="outlined"
          />
          <TextField
            color="#fff"
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <Button
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
          >
            SING In
          </Button>
        </div>
        <div className="text-center">
          Don't have an account? <a href="/Login">Create an account</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
