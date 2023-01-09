import { ThemeProvider } from 'styled-components';
import Router from './Router';
import GlobalStyles from './styles/globalStyle';
import theme from './styles/theme';
import Auth from './auth';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router />
      <Auth />
    </ThemeProvider>
  );
}

export default App;
