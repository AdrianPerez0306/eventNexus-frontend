import { blue, blueGrey, green, indigo, orange, purple, red } from "@mui/material/colors";
import { createTheme } from "@mui/material";


export const appTheme = (mode: boolean) => {
  // const [theme, setTheme] = useState<ThemeTypeAux>('light')

  // useEffect(() => {
  //       document.body.setAttribute('data-theme', theme);
  // }, [theme]);

  return createTheme({
    palette: {
      mode: mode ? 'dark' : 'light',
      ...(mode ? {
        primary: {
          main: blue[700],
          dark: blueGrey[700],
          light: blueGrey[700]
        },
        secondary: {
          main: blueGrey[700],
          dark: blueGrey[700],
          light: blueGrey[700]
        },
        warning:{
          main: orange[700],
          light: orange[700],
          dark: orange[700]
        },
        cardColor: { main: indigo[700] },
        details: { main: purple[200] },
        success: { main: green[200] },
        error: {
          main: red[700],
          dark: red[700],
          light: red[700]
        },
        background: {
          default: blueGrey[900]
        },
        create: {
          main: red[900]
        },
        
      } : {
        // primary: { main: deepOrange[300] },
        // secondary: { main: deepOrange[600] },
        // cardColor: { main: deepOrange[100] },
        // details: { main: purple[200] },
        // success: { main: green[500] },
        // background: {
        //   default: deepOrange[50]
        // }
        primary: {
          main: blue[700],
          dark: blueGrey[700],
          light: blueGrey[700]
        },
        warning:{
          main: orange[700],
          light: orange[700],
          dark: orange[700]
        },
        secondary: { main: blueGrey[700] },
        cardColor: { main: indigo[700] },
        details: { main: purple[200] },
        success: { main: green[200] },
        error: {
          main: red[700],
          dark: red[700],
          light: red[700]
        },
        background: {
          default: blueGrey[900]
        },
        create: {
          main: blueGrey[900]
        }
      })
    }
  });
}