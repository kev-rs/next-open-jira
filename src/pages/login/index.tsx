import { Box, Button, Card, CardContent, CardHeader, Grid, Link, TextField } from '@mui/material';
import NextLink from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import z from 'zod';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const schema = z.object({
  email: z.string().email(),
  password: z.string()
})

type FormValues = z.infer<typeof schema>

const Login = () => {

  const router = useRouter();
  const { register, handleSubmit } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const handleLogin: SubmitHandler<FormValues> = async ( data ) => {
    const res = await axios.post<{ email: string, name: string }>('/api/auth/login', data);
    console.log({status: res.status, text: res.statusText})
    // console.log(res);
    if(res.status === 200) return router.push('/');
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
            helperText='Enter your email'
            color='error'
            sx={{ mb: 2 }}
            {...register('email')}
          />
          <TextField
            fullWidth
            placeholder='*********'
            label='Password'
            helperText='Enter your password'
            color='error'
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

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // console.log({ctx});
  return {
    props: {  }
  }
}