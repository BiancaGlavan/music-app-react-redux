import { createTheme } from '@mui/material/styles';


declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
        gradient: {
            main: string;
        }
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
        gradient?: {
            main: string;
        }
    }
}