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
    };

    fontSize: {
      title: number;
      channelName: number;
      likes: number;
      subTitle: number;
      content: number;
      detailTitle: number;
      detailContent: number;
      detailUser: number;
      detailLikse: number;
      comment: number;
      commentUser: number;
      notification: number;
      notificationContent: number;
    };
  }
}
