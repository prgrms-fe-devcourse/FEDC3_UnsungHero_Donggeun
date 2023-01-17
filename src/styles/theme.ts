import { DefaultTheme } from 'styled-components';

const colors = {
  primary: '#52D2A4',
  white: '#ffffff',
  black: '#000000',
  background: '#FAFAFA',
  lightGray: '#838383',
  gray: '#454545',
  boxLine: 'rgba(94, 94, 94, 0.6)',
  contentLine: '#B1B1B1 ',
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

const theme: DefaultTheme = {
  colors,
  fontSize,
};

export default theme;
