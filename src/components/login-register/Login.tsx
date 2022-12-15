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

interface State {
    password: string;
    showPassword: boolean;
}

const Login = ({ onTabChange }: IPropsLogin) => {

    const [values, setValues] = useState<State>({
        password: '',
        showPassword: false,
    });

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    return (
        <StyledLogin>
           
            <TextField className="input first" label="Email" variant="standard" type="email" fullWidth 
            inputProps={{
                autocomplete: 'new-password',
                form: {
                  autocomplete: 'off',
                },
              }}/>
            <FormControl  className="input" fullWidth variant="standard" >
                <InputLabel  htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                    inputProps={{
                        autocomplete: 'new-password',
                        form: {
                          autocomplete: 'off',
                        },
                      }}
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <Button className="btn" variant="contained" size="large">
                Login
            </Button>
        </StyledLogin>
    )
}

export default Login;