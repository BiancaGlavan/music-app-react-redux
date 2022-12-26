import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
        paper: '#1f1f2b',
        default: '#181821'
    },
    primary: {
      main: "#00e676",
    },
    secondary: {
        main: '#fa7070'
    },

    mode: "dark",
  },
  typography: {
    fontFamily: "Poppins",
    fontSize: 12,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    body1: {
        fontWeight: 500,
        fontSize: 14
    },
    body2: {
        fontWeight: 400,
        fontSize: 14,
    },
    h1: {
      fontSize: "24px",
      fontWeight: 600,
    },
    h2: {
      fontSize: "18px",
      fontWeight: 500
    },
    h3: {
      fontSize: "16px",
    },
    h4: {
      fontSize: "14px",
    },
    h5: {
      fontSize: "12px",
    },
    h6: {
      fontSize: "12px",
    },
  },
  shape: {
    borderRadius: 4,
  },
  gradient: {
    main: "linear-gradient(90deg,#4ca5ff 2.34%,#b673f8 100.78%)",
  },
});

export default theme;
