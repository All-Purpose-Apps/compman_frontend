import { Outlet } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    <Container maxWidth={false} disableGutters>
      <Grid container>
        <Grid item xs={2} className='sidebar-container'>
          <Sidebar />
        </Grid>
        <Grid item xs={10} className='main-container'>
          <Grid container direction="column">
            <Grid item className='header-container'>
              <Header />
            </Grid>
            <Grid item id="content">
              <Outlet />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}