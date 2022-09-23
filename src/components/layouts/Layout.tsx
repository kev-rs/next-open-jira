import { Box } from '@mui/material'
import Head from 'next/head'
import { Navbar } from '../ui/Navbar';

interface Layout_ {
  children: JSX.Element | JSX.Element[];
  title: string;
}

export const Layout: React.FC<Layout_> = ({ children, title }) => {
  return (
    <Box>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      {/* Sidebar */}

      <Box component={'main'}>
        { children }
      </Box>
    </Box>
  )
}
