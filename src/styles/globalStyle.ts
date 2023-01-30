import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import BMHANNAPro from '../font/BMHANNAPro.ttf';
import GmarketSansMedium from '../font/GmarketSansMedium.otf';

const GlobalStyles = createGlobalStyle`
    ${normalize}
    html,
    body {
        font-size: 16px;
        background-color: #FAFAFA;
        width: 100%;
        font-family: 'GmarketSansMedium', sans-serif;
        @media (max-width: ${({ theme }) => theme.media.moblie}) {
        overflow: hidden;
        overflow-y: scroll;
        }
    }
    body::-webkit-scrollbar{
        width: 10px;
        height: 10px;
        background: transparent;
        @media (max-width: ${({ theme }) => theme.media.moblie}) {
        display: none;
        }
        }
    body::-webkit-scrollbar-thumb{
        background-color: #60606080;
        border-radius: 10px;
        
        }
        body::-webkit-scrollbar-track{
            background-color: #eeeeee;
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
    @font-face {
        font-family: 'BMHANNAPro';
        src: local('BMHANNAPro'), local('BMHANNAPro');
        font-style: normal;
        src: url(${BMHANNAPro}) format('truetype');
        font-display: block;
  }
  @font-face {
        font-family: 'GmarketSansMedium';
        src: local('GmarketSansMedium'), local('GmarketSansMedium');
        font-style: normal;
        src: url(${GmarketSansMedium}) format('truetype');
        font-display: block;
  }
`;

export default GlobalStyles;
