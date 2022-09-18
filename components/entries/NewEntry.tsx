import { useEffect, useState, useContext } from 'react';
import z from 'zod';
import { Box, Button, TextField } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EntriesContext, UIContext } from '../../context';

const schema = z.object({
  entry: z.string().min(1, { message: 'Required' })
});

export const NewEntry = () => {
  const { addEntry } = useContext(EntriesContext);
  const { entryType, setEntryType } = useContext(UIContext);
  const { register, handleSubmit, formState: { errors }, unregister, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { entry: '' }
  });
  
  useEffect(() => {
    if(entryType !== 'add') return unregister('entry');
  }, [ unregister, entryType ]);

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }} component='form' onSubmit={handleSubmit((e) => {
      setEntryType('close')
      addEntry(e.entry)
      console.log(e);
    })}>
      {entryType === 'add'
        ? (
          <>
            <TextField
              fullWidth
              sx={{ marginTop: 2, marginBottom: 2 }}
              placeholder='New entry'
              autoFocus
              multiline
              label='New entry'
              error={!!errors.entry?.message}
              helperText={`${errors.entry?.message ? errors.entry.message : 'Write something'}`}
              {...register('entry')}
            />
            <Box display={'flex'} justifyContent='space-between'>
              <Button
                variant='text'
                onClick={() => setEntryType('close')}
              >Cancel</Button>

              <Button
                variant='outlined'
                color='secondary'
                endIcon={<SaveOutlinedIcon />}
                type='submit'
              >Save</Button>
            </Box>
          </>
        )
        : (
          <Button
            variant='outlined'
            color='primary'
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => setEntryType('add')}
          >New entry</Button>
        )}
    </Box>

  )
}
