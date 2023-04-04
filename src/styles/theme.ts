import { DefaultTheme } from 'styled-components';

const colors = {
  primary: '#52D2A4',
  primaryDark: '#48b790',
  white: '#ffffff',
  black: '#000000',
  background: '#FAFAFA',
  lightGray: '#838383',
  gray: '#454545',
  grayHover: '#ededed',
  boxLine: 'rgba(94, 94, 94, 0.6)',
  contentLine: 'rgba(0, 0, 0, 0.22)',
  alert: '#FF1F1F',
  link: '#2853EB',
  placeholder: '#9E9E9E',
  shadow: 'rgba(0, 0, 0, 0.25)',
};

const fontSize = {
  larger: '1.25rem',
  large: '1.125rem',
  medium: '1rem',
  small: '0.875rem',
  smaller: '0.75rem',
};

const shadow = {
  boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.2), -1px -1px 4px rgba(0, 0, 0, 0.2)',
};

const media = {
  mobile: '576px',
  tablet: '1024px',
};

const theme: DefaultTheme = {
  colors,
  fontSize,
  shadow,
  media,
};

export default theme;
