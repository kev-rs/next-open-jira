import { useState, type ChangeEvent, useMemo, useContext } from 'react';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { prisma, Entry } from '../../backend/utils/prisma'
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from "@mui/material"
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Layout } from "../../components/layouts"
import { Status } from '../../backend/utils/prisma'
import type { EntryStatus } from "../../interfaces";
import { EntriesContext } from '../../context';
import moment from 'moment';
import z from 'zod'
import { useSnackbar } from 'notistack';


// const schema = z.object({
//   entry: z.string().min(1, { message: 'Required' }),
//   // status: z.enum(['pending', 'in_progress', 'completed'])
//   status: z.string().array()
// })

const entryStatus: Status[] = ['pending', 'in_progress', 'completed'];

const Entry: React.FC<{ entry: Entry }> = ({ entry }) => {

  const createdAt = moment(entry.createdAt).fromNow();
  const { enqueueSnackbar } = useSnackbar();
  
  const [ value, setValue ] = useState(entry.info);
  const [ status, setStatus ] = useState<EntryStatus>(entry.status);
  const [ touched, setTouched ] = useState(false)
  const { updateEntry, deleteEntry } = useContext(EntriesContext);
  const router = useRouter();
  
  const check = useMemo( () => value.length < 1 && touched, [ value, touched ]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const handleStatus = (e: ChangeEvent<HTMLInputElement>) => setStatus(e.target.value as EntryStatus);

  const handleSave = () => {
    if(value === '') return;
    updateEntry({...entry, info: value, status});
    enqueueSnackbar('Entry updated', { variant: 'success' })
    router.push('/');
  }

  const handleDelete = () => {
    deleteEntry(entry);
    enqueueSnackbar('Entry deleted', { variant: 'success' })
    router.push('/');
  }

  return (
    <Layout title='Edit'>
      <Grid
        container
        justifyContent={'center'}
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title='Entry' subheader={createdAt} />

            <CardContent>
              <TextField 
                sx={{ margin: '2px 0px 1px 0px' }}
                fullWidth
                multiline
                autoFocus
                placeholder="New entry"
                label='New entry'
                value={value}
                onBlur={() => setTouched(true)}
                onChange={handleChange}
                helperText={check && 'Create new entry'}
                error={check}
              />
              
              <FormControl>
                <FormLabel>Status</FormLabel>
                <RadioGroup 
                  row
                  value={status}
                  onChange={handleStatus}
                >
                  {entryStatus.map((status) => (
                    <FormControlLabel
                      key={status}
                      value={status}
                      control={<Radio />}
                      label={capitalize(status)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                startIcon={<SaveAltOutlinedIcon />}
                variant='contained'
                fullWidth
                onClick={handleSave}
                disabled={value.length < 1}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'error.dark'
        }}
        onClick={handleDelete}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>

    </Layout>
  )
}

export default Entry;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query as { id: string };
  
  const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$');
  if(!checkMongoIDRegExp.test(id)) return { redirect: { destination: '/', permanent: false } } 

  const entry = await prisma.entry.findUnique({ where: { id } });

  return {
    props: { entry: { ...entry, createdAt: `${entry?.createdAt}`} },
  }
}
