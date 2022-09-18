import { useContext } from "react";
import { Card, CardHeader, Grid } from "@mui/material";
import { Layout } from "../components/layouts";
import { EntriesContext } from "../context";
import { Container, NewEntry } from "../components/entries";

const Home: React.FC = () => {
  const { entries } = useContext(EntriesContext);

  // console.log(process.env.NEXT_PUBLIC_CLIENT_KEY)

  return (
    <Layout title='Open Jira'>
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
            <Container status="in-progress" />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Completed' />
            <Container status="completed" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}





export default Home;

