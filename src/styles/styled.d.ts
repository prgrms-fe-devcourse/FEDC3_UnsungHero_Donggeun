import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      white: string;
      black: string;
      background: string;
      lightGray: string;
      gray: string;
      grayHover: string;
      boxLine: string;
      contentLine: string;
      alert: string;
      link: string;
      placeholder: string;
      shadow: string;
    };

    fontSize: {
      larger: string;
      large: string;
      medium: string;
      small: string;
      smaller: string;
    };

    shadow: {
      boxShadow: string;
    };

    media: {
      mobile: string;
      tablet: string;
    };
  }
}
