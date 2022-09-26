import { Box, Button, Card, CardContent, CardHeader, Grid, Link, TextField } from '@mui/material';
import NextLink from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import z from 'zod';

const schema = z.object({
  email: z.string().min(1, 'Required').email(),
  password: z.string().min(1, 'Required')
})

type FormValues = z.infer<typeof schema>

const Login = () => {

  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormValues>({ 
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'all'
  });

  const handleLogin: SubmitHandler<FormValues> = async ( data ) => {
    try {
      const res = await axios.post('/api/auth/login', data);
      if(res.status === 200) return router.push('/');  
    } catch (err) {
      setError('email', { message: 'Invalid credentials' })
    }    
  }

  return (
    <Grid container display={'flex'} justifyContent='center' alignItems={'center'} sx={{ height: '100vh' }}>
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader title='Login' sx={{ textAlign: 'center' }} />

        <CardContent>
          <TextField
            fullWidth
            placeholder='user@mail.com'
            label='Email'
            helperText={errors.email?.message ? errors.email?.message : 'Enter your email'}
            error={!!errors.email?.message}
            sx={{ mb: 2 }}
            {...register('email')}
          />
          <TextField
            fullWidth
            placeholder='*********'
            label='Password'
            helperText={errors.password?.message ? errors.password?.message : 'Enter your password'}
            error={!!errors.password?.message}
            {...register('password')}
          />
          <Box component='div' display={'flex'} justifyContent='space-between' alignItems={'center'} sx={{ mt: 2 }}>
            <Button 
              color='error' 
              variant='outlined'
              onClick={handleSubmit(handleLogin)}
            >Login</Button>
            <NextLink href='/register' passHref>
              <Link color='error' underline='hover'>Create account</Link>
            </NextLink>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Login;

