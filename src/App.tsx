import { ThemeProvider } from 'styled-components';
import TokenProvider from './contexts/TokenProvider';
import Router from './Router';
import GlobalStyles from './styles/globalStyle';
import theme from './styles/theme';
import NotificationStatusProvider from './contexts/NotificationStatusProvider';

function App() {
  return (
    <TokenProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </TokenProvider>
  );
}

export default App;
