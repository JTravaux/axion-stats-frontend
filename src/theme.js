import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: "Poppins, sans-serif",
    },
    overrides: {
        // Applied to the <ul> element
        MuiMenu: {
            list: {
                backgroundColor: "#4C598E",
            }
        }
    },
    palette: {
        common: {
            black: "#000",
            white: "#fff"
        },
        background: {
            paper: "#EAEEF7",
            default: "#EAEEF7"
        },
        primary: {
            light: "#00A6E8",
            main: "#1575a9",
            dark: "#0072BC",
            contrastText: "#fff"
        },
        secondary: {
            fontFamily: "Roberto, sans-serif",
            light: "#89D7F7", 
            main: "#00AEEF", 
            dark: "#0055A6",
            contrastText: "#fff"
        },
        error: {
            light: "#ff9caa",
            main: "#ff7285",
            dark: "#b3505d",
            contrastText: "#fff"
        },
        success: {
            light: "#6dc762",
            main: "#09af00",
            dark: "#007d00",
            contrastText: "#fff"
        },
        text: {
            primary: "rgba(0,0,0, 0.87)",
            secondary: "rgba(0,0,0, 0.54)",
            disabled: "rgba(0,0,0, 0.38)",
            hint: "rgba(0,0,0, 0.38)"
        }
    }
});

export default theme;