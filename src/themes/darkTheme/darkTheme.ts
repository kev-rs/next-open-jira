import { createTheme } from '@mui/material'
import { pink, blue, red } from '@mui/material/colors';


export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: pink[400],
    },
    secondary: {
      main: blue.A100
    },
    error: {
      main: red.A200
    }
  },
  // components: {
  //   MuiAppBar: {
  //     defaultProps: {
  //       elevation: 0
  //     },
  //     styleOverrides: {
  //       root: {
  //         background: '#4a148c'
  //       }
  //     }
  //   }
  // }
})