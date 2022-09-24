import NextLink from 'next/link'
import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/MenuOutlined';

export const Navbar = () => {

  return (
    <AppBar position='sticky' sx={{ marginBottom: 3 }}>
      <Toolbar>
        <IconButton sx={{ mr: 2 }} edge='start'>
          <MenuIcon />
        </IconButton>
        <NextLink href='/' passHref>
          <Link>
            <Typography color='primary.main' variant='h4'>Open Jira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  )
}
