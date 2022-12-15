import { Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface IPropsRegister {
    onTabChange: (tab: string) => void;
}

const StyledRegister = styled('div')`
    
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

const Register = ({onTabChange}: IPropsRegister) => {
  return (
    <StyledRegister>
        <TextField className="input first" label="Username" variant="standard" type="text" fullWidth inputProps={{
                        autocomplete: 'new-password',
                        form: {
                          autocomplete: 'off',
                        },
                      }}/>
        <TextField className="input" label="Email" variant="standard" type="email" fullWidth inputProps={{
                        autocomplete: 'new-password',
                        form: {
                          autocomplete: 'off',
                        },
                      }}/>
        <TextField className="input" label="Password" variant="standard" type="password" fullWidth inputProps={{
                        autocomplete: 'new-password',
                        form: {
                          autocomplete: 'off',
                        },
                      }}/>
        <TextField className="input" label="Confirm password" variant="standard" type="password" fullWidth inputProps={{
                        autocomplete: 'new-password',
                        form: {
                          autocomplete: 'off',
                        },
                      }}/>
        <Button className="btn" variant="contained" size="large">
                Register
        </Button>

    </StyledRegister>
  )
}

export default Register;