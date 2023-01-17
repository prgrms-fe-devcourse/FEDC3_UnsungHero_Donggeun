import { ThemeProvider } from 'styled-components';
import TokenProvider from './contexts/TokenProvider';
import Router from './Router';
import GlobalStyles from './styles/globalStyle';
import theme from './styles/theme';
import NotificationStatusProvider from './contexts/NotificationStatusProvider';

function App() {
  return (
    <TokenProvider>
      <NotificationStatusProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Router />
        </ThemeProvider>
      </NotificationStatusProvider>
    </TokenProvider>
  );
}

export default App;
