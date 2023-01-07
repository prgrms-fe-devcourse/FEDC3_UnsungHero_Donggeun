import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      white: string;
      black: string;
    };

    fontSize: {
      title: number;
      subTitle: number;
      content: number;
    };
  }
}
