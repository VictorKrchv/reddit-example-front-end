import styled from 'styled-components';

import { Header } from '@widgets/header';
import { Pages } from '@pages';
import { ResetPasswordModal } from '@features/reset-password';
import { CssBaseline } from '@mui/material';

import { MainProvider } from './providers';

import './global-styles.css';
import 'emoji-mart/css/emoji-mart.css';

export const App = () => {
  return (
    <>
      <Modals />
      <CssBaseline />
      <MainProvider>
        <Main>
          <Header />
          <Pages />
        </Main>
      </MainProvider>
    </>
  );
};

const Modals = () => {
  return (
    <>
      <ResetPasswordModal />
    </>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
