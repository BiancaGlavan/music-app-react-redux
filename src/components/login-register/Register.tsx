import { Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useRegisterUserMutation } from "../../redux/features/apiSlice";

interface IPropsRegister {
  onTabChange: (tab: string) => void;
}

const StyledRegister = styled("div")`
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

const Register = ({ onTabChange }: IPropsRegister) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [registerUser, response] = useRegisterUserMutation();
  const { isLoading, isSuccess } = response;

  console.log("responseee: ", response.isLoading);

  const handleRegister = () => {
    const user = {
      name: username,
      email: email,
      password: password,
    };

    registerUser({ data: user });
  };

  useEffect(() => {
    console.log('response useeffect: ', response);
  }, [response]);

  return (
    <StyledRegister>
      <TextField
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input first"
        label="Username"
        variant="outlined"
        type="text"
        fullWidth
        inputProps={{
          autoComplete: "new-password",
          form: {
            autoComplete: "off",
          },
        }}
      />
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
        label="Email"
        variant="outlined"
        type="email"
        fullWidth
        inputProps={{
          autoComplete: "new-password",
          form: {
            autoComplete: "off",
          },
        }}
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

      <Button onClick={handleRegister} className="btn" variant="contained" size="large">
        Register
      </Button>
    </StyledRegister>
  );
};

export default Register;
