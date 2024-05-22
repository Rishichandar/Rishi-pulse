import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../HTTPHandler/api";
import { toast } from "react-toastify";
import "./login.css";
import { Divider, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Loginpage = () => {
  // ! USING USEFORM HOOK
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  const navigate = useNavigate();
  const onSubmit = (data) => {
    loginUser(data)
      .then((res) => {
        console.log(res);
        if (res.Status === "Success") {
          toast.success("Get ready");
          navigate("/main");
        } else {
          toast.error(res.ErrMessage);
        }
      })
      .catch((error) => {
        console.log("Error logging in:", error);
      });
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="main">
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            display={"flex"}
            height={400}
            flexDirection={"column"}
            maxWidth={450}
            justifyContent={"center"}
            alignItems={"center"}
            margin={"auto"}
            padding={5}
            bgcolor={"#eaf6f6"}
            borderRadius={9}
            // boxShadow={"8px 8px 15px #ccc"}
            sx={{
              boxShadow: "0px 0px 10px #aaa",
              ":hover": {
                boxShadow: "8px 8px 20px #27ABCC",
              },
            }}
          >
            <Typography variant="h3" padding={3} textAlign={"center"}>
              Login
            </Typography>
            <TextField
              type="email"
              variant="outlined"
              label="Email"
              name="Email"
              {...register("Email", { required: "Email id is required" })}
              sx={{ width: "300px", mb: 1 }}
              error={Boolean(errors.Email)}
              helperText={errors.Email && errors.Email.message}
            />

            <TextField
              type={showPassword ? "text" : "password"}
              marginTop={8}
              variant="outlined"
              label="Password"
              name="Password"
              {...register("Password", { required: "password is required" })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                      {/* Consider changing this icon */}
                    </IconButton>
                    {/* <VisibilityOff /> */}
                  </InputAdornment>
                ),
              }}
              sx={{ width: "300px", height: "100px" }}
              error={Boolean(errors.Password)}
              helperText={errors.Password && errors.Password.message}
            />
            <Button
              sx={{ marginTop: 3, borderRadius: 5 }}
              size="large"
              variant="contained"
              color="success"
              type="submit"
            >
              Login
            </Button>
            <Divider sx={{ width: "100%", mt: 2 }}>or</Divider>

            <Link to="/forgotpass">
              <Button marginTop={"10px"} sx={{ marginTop: 1, borderRadius: 3 }}>
                Forgot password
              </Button>
            </Link>
          </Box>
        </form>
      </div>
    </div>
  );
};
