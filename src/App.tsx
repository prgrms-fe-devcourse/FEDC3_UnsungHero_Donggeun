import { ThemeProvider } from 'styled-components';
import TokenProvider from './contexts/TokenProvider';
import Router from './Router';
import GlobalStyles from './styles/globalStyle';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TokenProvider>
        <GlobalStyles />
        <Router />
      </TokenProvider>
    </ThemeProvider>
  );
}

export default App;
