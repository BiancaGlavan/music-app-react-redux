import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/features/apiSlice";
import { login } from "../../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface IPropsLogin {
  onTabChange: (tab: string) => void;
}

const StyledLogin = styled("div")`
  .first {
    margin-top: 30px;
  }

  .input {
    margin-bottom: 20px;
  }

  .btn {
    margin: 30px 0;
    width: 100%;
  }
`;

const Login = ({ onTabChange }: IPropsLogin) => {
  const [loginUser, response] = useLoginUserMutation();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { data: loginResponse, isSuccess, isLoading } = response;
  const authState = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const currentUser = {
      name: name,
      password: password,
    };

    loginUser({ data: currentUser });
  };

  useEffect(() => {


    console.log('login: ', loginResponse);

    if (isSuccess) {
      dispatch(login(loginResponse.access_token));
      navigate("/");
    }
  }, [isSuccess, loginResponse]);

  useEffect(() => {
    if (authState.isAuth) {
      navigate("/");
    }
  }, [authState]);
  return (
    <StyledLogin>
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input first"
        label="Username"
        variant="outlined"
        type="text"
        fullWidth
        autoComplete="off"
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        inputProps={{
          autoComplete: "new-password",
          form: {
            autoComplete: "off",
          },
        }}
      />
      <Button onClick={handleLogin} className="btn" variant="contained" size="large">
        Login
      </Button>
    </StyledLogin>
  );
};

export default Login;
