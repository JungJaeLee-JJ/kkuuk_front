import { createTheme } from '@material-ui/core/styles';

const Theme = createTheme({
  palette: {
    primary: {
      light: '#FF7473',
      main: '#FF7473',
      dark: '#FF7473',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

export  default Theme;
