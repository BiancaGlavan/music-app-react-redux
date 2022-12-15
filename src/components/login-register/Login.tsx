import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

interface IPropsLogin {
    onTabChange: (tab: string) => void;
}

const StyledLogin = styled('div')`

  

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

    return (
        <StyledLogin>
           
            <TextField className="input first" label="Email" variant="outlined" type="email" fullWidth 
            inputProps={{
                autocomplete: 'new-password',
                form: {
                  autocomplete: 'off',
                },
              }}/>
            <TextField className="input" label="Password" variant="outlined" type="password" fullWidth 
            inputProps={{
                autocomplete: 'new-password',
                form: {
                  autocomplete: 'off',
                },
              }}/>           
            <Button className="btn" variant="contained" size="large">
                Login
            </Button>
        </StyledLogin>
    )
}

export default Login;