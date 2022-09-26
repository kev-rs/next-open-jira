import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Grid, Card, CardHeader, CardContent, TextField, Box, Button, Link } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import axios from 'axios';

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
  confirm_password: z.string()
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"]
})

type FormValues = z.infer<typeof schema>

const Register = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ 
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', password: '', confirm_password: '' },
    mode: 'all'
  });

  const handleSave: SubmitHandler<FormValues> = async ({ confirm_password, ...rest }) => {
    const res = await axios.post('/api/auth/register', rest);
    if (res.status === 200) return router.push('/login')
  }

  return (
    <Grid container display={'flex'} justifyContent='center' alignItems={'center'} sx={{ height: '100vh' }}>
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader title='Sign up' sx={{ textAlign: 'center' }} />

        <CardContent>
          <TextField
            fullWidth
            multiline
            placeholder='Name'
            label='Name'
            helperText={errors.name?.message ? errors.name?.message : 'Enter your name'}
            error={!!errors.name?.message}
            color='error'
            sx={{ mb: 2 }}
            {...register('name')}
          />
          <TextField
            fullWidth
            multiline
            placeholder='user@mail.com'
            label='Email'
            helperText={errors.email?.message ? errors.email?.message : 'Enter your email'}
            error={!!errors.email?.message}
            color='error'
            sx={{ mb: 2 }}
            {...register('email')}
          />
          <TextField
            fullWidth
            multiline
            placeholder='*********'
            label='Password'
            helperText={errors.password?.message ? errors.password?.message : 'Enter your password'}
            error={!!errors.password?.message}
            color='error'
            {...register('password')}
          />
          <TextField
            fullWidth
            multiline
            placeholder='*********'
            label='Password'
            helperText={errors.confirm_password?.message ? errors.confirm_password?.message : 'Repeat your password'}
            error={!!errors.confirm_password?.message}
            color='error'
            {...register('confirm_password')}
          />
          <Box component='div' display={'flex'} justifyContent='space-between' alignItems={'center'} sx={{ mt: 2 }}>
            <Button
              color='error'
              variant='outlined'
              onClick={handleSubmit(handleSave)}
            >Sign up</Button>
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