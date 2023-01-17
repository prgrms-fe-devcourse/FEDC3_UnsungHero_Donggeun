import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyles = createGlobalStyle`
    ${normalize}
    html,
    body {
        font-size: 16px;
        background-color: #FAFAFA;
    }
    #root {
    height: 100%;
    }
    * {
    box-sizing: border-box;
    }
    a {
    color: inherit;
    text-decoration: none;
    }
`;

export default GlobalStyles;
