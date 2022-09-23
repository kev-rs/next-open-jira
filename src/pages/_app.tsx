import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { EntriesProvider } from '../context';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from '../themes/'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </EntriesProvider>
  )
}

export default MyApp;
