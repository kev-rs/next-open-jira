import { useState, useEffect, FormEvent } from 'react';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod'

const schema = z.object({
  entry: z.string().min(1, 'Required')
})

export const NewEntry = () => {

  const [ isOpen, setIsOpen ] = useState(false);
  const { register, unregister, formState: { errors, touchedFields }, handleSubmit } = useForm({
    defaultValues: { entry: '' },
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    if( !isOpen ) return unregister('entry');
  }, [ unregister, isOpen ]);

  if(!isOpen) return (
    <>
      <Box component={'div'} display='flex' justifyContent={'flex-start'} sx={{padding: 1}}>
        <Button
          onClick={() => setIsOpen(true)}
        >New entry</Button>
      </Box>
    </>
  )
  return (
    <Box component={'form'} sx={{padding: 2}} onSubmit={handleSubmit((e) => {
      console.log(e);
      setIsOpen(false);
    })}>
      <Box component='div'>
        <TextField 
          multiline
          fullWidth
          autoFocus
          placeholder='Type new entry'
          helperText='Type new entry'
          label='New entry'
          variant='outlined'
          {...register('entry')}
        />
      </Box>

      <Box component={'div'} display='flex' justifyContent={'space-between'}>
        <Button
          onClick={() => setIsOpen(false)}
        >Cancel</Button>
        <Button
          variant='outlined'
          endIcon={<SaveOutlinedIcon />}
          type='submit'
        >Save</Button>
      </Box>
    </Box>
  )
}
