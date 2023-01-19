import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyles = createGlobalStyle`
    ${normalize}
    html,
    body {
        font-size: 16px;
        background-color: #FAFAFA;
        font-family: 'Noto Sans KR', sans-serif;
    }
    body::-webkit-scrollbar{
        width: 10px;
        height: 10px;
        }
    body::-webkit-scrollbar-thumb{
        background-color: #60606080;
        border-radius: 10px;
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
