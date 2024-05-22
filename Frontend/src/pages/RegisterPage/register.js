import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { IconButton, MenuItem, Select, InputAdornment } from "@mui/material";
import api from "../../HTTPHandler/axiosConfig";
import { toast } from "react-toastify";
// !here changes
import {
  ForwardRounded,
  Password,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";
import { regEmailSender } from "../../HTTPHandler/api";

export default function Register() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const onSubmit = (data) => {
    createUser(data); //(like making network requests).
  };

  const createUser = async (data) => {
    try {
      const response = await api.post("/user/create", data); //data will passes in the request body this lines send the req to url endpoint
      // window.alert(response);
      console.log(response);
      toast.success("Successfully Registerd! ");
      //! Send registration email
      try {
        await regEmailSender(data.Email, data.Password);
        toast.success("Registration email sent successfully!");
      } catch (emailError) {
        console.error("Error sending registration email:", emailError);
        toast.error("Failed to send registration email.");
      }

      reset();
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Email already exists. Please use a different email.");
        } else if (error.response.status === 401) {
          toast.error("Unauthorized request. Check credentials.");
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } else {
        toast.error("Network or server error.");
      }
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <NavLink
        to="/main"
        style={{
          textDecoration: "none",
          position: "absolute",
          top: "18%",
          left: "86%",
        }}
      >
        <Button variant="contained" href="#contained-buttons">
          Back
        </Button>
      </NavLink>
      {/* <Link
        style={{ position: "absolute", top: "18%", left: "86%" }}
        to={"/main"}
      >
        <span style={{ position: "relative", top: "-20px" }}> Back</span>
        <ForwardRounded style={{ width: "50px", height: "50px" }} />
      </Link> */}
      <div style={{ width: "500px", height: "400px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            display={"flex"}
            height={350}
            flexDirection={"column"}
            maxWidth={400}
            justifyContent={"center"}
            alignItems={"center"}
            margin={"auto"}
            padding={5}
            borderRadius={9}
            sx={{
              boxShadow: "0px 0px 10px #aaa",
              "&:hover": {
                boxShadow: "8px 8px 20px #27ABCC",
              },
            }}
          >
            {/* adding text on the browser */}
            <Typography variant="h3" padding={3} textAlign={"center"}>
              Register
            </Typography>

            <TextField
              type="email"
              variant="outlined"
              label="Email"
              name="Email"
              fullWidth
              error={!!errors.Email}
              helperText={errors.Email?.message}
              {...register("Email", { required: "Email id is required" })}
              sx={{ width: "300px", height: "100px", marginBottom: "10px" }}
            />

            <TextField
              type={showPassword ? "text" : "password"}
              variant="outlined"
              label="Password"
              name="Password"
              error={!!errors.Email}
              helperText={errors.Email?.message}
              {...register("Password", { required: "Password is required" })}
              fullWidth
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
              sx={{ width: "300px", height: "100px", marginBottom: "10px" }}
            />

            <Select
              variant="standard"
              defaultValue="-1"
              {...register("RoleId", { required: true })}
              sx={{ width: "300px", height: "100px", marginBottom: "10px" }}
            >
              <MenuItem value="-1" disabled>
                select
              </MenuItem>
              <MenuItem value="1">Admin</MenuItem>
              <MenuItem value="2">Employee</MenuItem>
            </Select>
            {/* Link is used in react router dom in app.js  */}
            <Button
              sx={{ marginTop: 3, borderRadius: 2 }}
              size="large"
              variant="contained"
              color="success"
              type="submit"
            >
              Register
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
}
