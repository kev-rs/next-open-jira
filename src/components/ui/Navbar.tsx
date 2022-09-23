import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/MenuOutlined';

export const Navbar = () => {
  return (
    <AppBar position='sticky' sx={{marginBottom: 3}}>
      <Toolbar>
        <IconButton sx={{mr: 2}} edge='start'>
          <MenuIcon />
        </IconButton>
        <Typography color='primary.main' variant='h4'>Open Jira</Typography>
      </Toolbar>
    </AppBar>
  )
}
