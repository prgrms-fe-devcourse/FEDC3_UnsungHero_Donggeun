import { ThemeProvider } from 'styled-components';
import TokenProvider from './contexts/TokenProvider';
import Router from './Router';
import GlobalStyles from './styles/globalStyle';
import theme from './styles/theme';
import NotificationStatusProvider from './contexts/NotificationStatusProvider';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TokenProvider>
        <NotificationStatusProvider>
          <GlobalStyles />
          <Router />
        </NotificationStatusProvider>
      </TokenProvider>
    </ThemeProvider>
  );
}

export default App;
