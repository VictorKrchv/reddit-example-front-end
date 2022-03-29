import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Stack,
  Grid,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Container,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import { paths } from '@pages/paths';
import { useUser } from '@entities/session';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useDispatch } from 'react-redux';
import { logoutThunk, useIsAuthorized } from '@entities/session';

export function Header() {
  const isAuth = useIsAuthorized();

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Grid container justifyContent="space-between">
          <Grid item alignItems="center" style={{ display: 'flex' }}>
            <Link to={paths.home()}>
              <Typography variant="h6" noWrap component="div">
                Reddit
              </Typography>
            </Link>
          </Grid>
          <Grid item>{isAuth ? <UserMenu /> : <AuthButtons />}</Grid>
        </Grid>
      </Toolbar>
    </React.Fragment>
  );
}

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  return (
    <>
      <div>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem>
            <Link to={paths.favorites()}>Favorites</Link>
          </MenuItem>
          <MenuItem>
            <Link to={paths.settings()}>Settings</Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </>
  );
};

const AuthButtons = () => (
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
);
