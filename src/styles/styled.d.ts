import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      white: string;
      black: string;
      background: string;
      lightGray: string;
      gray: string;
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
  }
}
