import { Provider } from 'react-redux';

import { Header } from '@widgets/header';
import { Pages } from '@pages';

import { store } from './store';
import styled from 'styled-components';

import './global-styles.css';

export const App = () => {
  return (
    <Provider store={store}>
      <Main>
        <Header />
        <Pages />
      </Main>
    </Provider>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
