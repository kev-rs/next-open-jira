import { AppBar, IconButton, Toolbar, Typography, Link, Box, Button } from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useContext, useState } from 'react';
import { UIContext } from "../../context";
import NextLink from 'next/link'
import { useRouter } from 'next/router';
import axios from 'axios';

export const Nav: React.FC = () => {

  const { setStatus } = useContext(UIContext);
  const router = useRouter();
  const [ user, setUser ] = useState<{ email: string, name: string }>();

  const handleLogin = async () => {
    const { data } = await axios.get('/api/user');
    setUser(data);
    // router.push('/login')
  }

  const handleLogout = async () => {
    const res = await axios.post('/api/auth/logout');
    router.push('/login')
    console.log(res);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='sticky' variant='outlined'>
        <Toolbar>
          <IconButton size='large' edge='start' onClick={() => setStatus(true)}>
            <MenuOutlinedIcon />
          </IconButton>
          <NextLink href='/' passHref>
            <Link underline='none' color='snow' sx={{ flexGrow: 1 }}>
              <Typography variant='h6' component="div" color='error'>Open Jira</Typography>
            </Link>
          </NextLink>

          <Box component='div'>
            { JSON.stringify(user, null, 3) }
          </Box>
          
          <Box component={'div'} display='flex' gap={2}>
            <Button color='error' variant='text'
              onClick={handleLogin}
            >Login</Button>
            <Button color='error' variant='outlined'
              onClick={() => router.push('/register')}
            >Sign up</Button>
            <Button color='error' variant='outlined'
              onClick={handleLogout}
            >Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
