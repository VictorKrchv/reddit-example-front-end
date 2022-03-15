import { CssBaseline, Grid } from '@mui/material';
import { renderRoutes, RouteConfig } from 'react-router-config';
import styled from 'styled-components';

export const AuthPage = ({ route }: RouteConfig) => {
  return (
    <Grid container component="main" sx={{ flex: '1 1 auto' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <>{renderRoutes(route.routes)}</>
    </Grid>
  );
};
