import { DefaultTheme } from 'styled-components';

const colors = {
  primary: '#52D2A4',
  white: '#ffffff',
  black: '#000000',
  background: '#FAFAFA',
  lightGray: '#838383',
  gray: '#454545',
};

const fontSize = {
  title: 18,
  channelName: 18,
  subTitle: 16,
  content: 16,
  likes: 14,
  detailTitle: 20,
  detailContent: 16,
  detailUser: 14,
  detailLikse: 16,
  comment: 14,
  commentUser: 12,
  notification: 16,
  notificationContent: 14,
};

const theme: DefaultTheme = {
  colors,
  fontSize,
};

export default theme;
