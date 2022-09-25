import { Grid, Card, CardHeader, CardContent, TextField, Box, Button, Link } from '@mui/material';
import NextLink from 'next/link';

const Register = () => {
  return (
    <Grid container display={'flex'} justifyContent='center' alignItems={'center'} sx={{ height: '100vh' }}>
      {/* <Grid> */}
      <Card sx={{maxWidth: 400}}>
        <CardHeader title='Sign up' sx={{textAlign: 'center'}} />

        <CardContent>
          <TextField 
            fullWidth
            multiline
            placeholder='Name'
            label='Name'
            helperText='Enter your name'
            color='error'
            sx={{mb: 2}}
          />
          <TextField 
            fullWidth
            multiline
            placeholder='user@mail.com'
            label='Email'
            helperText='Enter your email'
            color='error'
            sx={{mb: 2}}
          />
          <TextField 
            fullWidth
            multiline
            placeholder='*********'
            label='Password'
            helperText='Enter your password'
            color='error'
          />
          <TextField 
            fullWidth
            multiline
            placeholder='*********'
            label='Password'
            helperText='Repeat your password'
            color='error'
          />
          <Box component='div' display={'flex'} justifyContent='space-between' alignItems={'center'} sx={{mt: 2}}>
            <Button color='error' variant='outlined'>Sign up</Button>
            <NextLink href='/login' passHref>
              <Link color='error' underline='hover'>Already register ?</Link>
            </NextLink>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Register