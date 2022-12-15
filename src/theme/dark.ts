import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            paper: '#0d0c0c',
            default: '#0f0f0f'
        },
        primary: {
            main: '#d62828'
        },

        mode: 'dark'

    },
    typography: {
        fontFamily: 'Poppins'
    },
    shape: {
        borderRadius: 4
    },
    gradient: {
        main: 'linear-gradient(90deg,#4ca5ff 2.34%,#b673f8 100.78%)'
    }
});


export default theme;