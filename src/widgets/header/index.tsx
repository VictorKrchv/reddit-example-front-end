import * as React from 'react';
import { Link } from 'react-router-dom';
import { Stack, Grid, Toolbar, Button, Typography } from '@mui/material';
import { paths } from '@pages/paths';

export function Header() {
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              sx={{ flex: 1 }}
            >
              Reddit
            </Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={2}>
              <Link to={paths.signIn()}>
                <Button variant="outlined" size="small">
                  Sign in
                </Button>
              </Link>
              <Link to={paths.signUp()}>
                <Button variant="contained" size="small">
                  Sign up
                </Button>
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
    </React.Fragment>
  );
}
