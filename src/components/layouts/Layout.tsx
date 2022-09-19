import Head from "next/head"
import { Box } from "@mui/material";
import { Nav, Sidebar } from '../ui';

interface Lay {
  children: JSX.Element | JSX.Element[];
  title: string;
}

export const Layout: React.FC<Lay> = ({ children, title }) => {
  return (
    <Box sx={{flexFlow: 1}}>
      <Head>
        <title>{ title }</title>
      </Head>

      <Nav />
      <Sidebar />

      <Box component='main' sx={{padding: '10px 20px'}}>{children}</Box>
    </Box>
  )
}
