import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from "@mui/material";
import { GetServerSideProps } from "next"
import { Layout } from "../../components/layouts";
import { prisma, Entry, Status } from '../../server/db/prisma';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ChangeEvent, useState, useMemo, useContext } from 'react';
import { EntriesContext } from '../../context/entries/store';
import { useRouter } from "next/router";

const entryStatus: Status[] = ['pending', 'in_progress', 'finished']

const Entry: React.FC<{ entry: Entry }> = ({ entry }) => {

  console.log({entry})

  const { updateEntry, deleteEntry } = useContext(EntriesContext);
  const [value, setValue] = useState<string>(entry.info);
  const [status, setStatus] = useState<Status | null>(entry.status)
  const [touched, setTouched] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }
  const handleStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as Status);
  }
  const handleSave = () => {
    if(value.length < 1) return;
    updateEntry({ ...entry, info: value, status });
    router.push('/');
  }
  const handleDelete = () => {
    deleteEntry({...entry});
    router.push('/');
  }

  const check = useMemo(() => value.length < 1 && touched, [touched, value.length]);

  return (
    <Layout title='Edit entry'>
      <Grid
        container
        justifyContent={'center'}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title='Entry' />

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

export default Entry

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

  const { id } = query as { id: string };
  const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$');
  if (!checkMongoIDRegExp.test(id)) return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }

  const entry = await prisma.entry.findUnique({ where: { id } });

  return {
    props: { entry: { ...entry, createdAt: `${entry?.createdAt}` } }
  }
}