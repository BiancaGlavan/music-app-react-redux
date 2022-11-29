import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {

        },
        primary: {
            main: '#E85A4F'
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