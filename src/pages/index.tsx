import { useEffect } from 'react';
import { Card, CardHeader, Grid } from '@mui/material';
import { GetStaticProps } from 'next';
import { Layout } from '../components/layouts';
import { prisma, Entry } from '../server/db/prisma';
import { Container, NewEntry } from '../components/entries'

const Home: React.FC<{ entries: Entry[] }> = ({ entries }) => {

  return (
    <Layout title='Home'>
      <Grid container spacing={2}>
        {/* {entries.map((prop) => ( */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Pending' />
            <NewEntry />
            <Container status="pending" />
          </Card>
        </Grid>
        {/* ))} */}

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='In progress' />
            <Container status="in_progress" />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Completed' />
            <Container status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Home;
