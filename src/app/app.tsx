import { Provider } from 'react-redux';
import styled from 'styled-components';

import { Header } from '@widgets/header';
import { Pages } from '@pages';

import { MainProvider } from './providers';
import { store } from './store';

import './global-styles.css';

export const App = () => {
  return (
    <Provider store={store}>
      <MainProvider>
        <Main>
          <Header />
          <Pages />
        </Main>
      </MainProvider>
    </Provider>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
