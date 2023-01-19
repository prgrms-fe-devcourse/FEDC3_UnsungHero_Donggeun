import styled from 'styled-components';

interface IProps extends React.HTMLAttributes<HTMLElement> {
  text?: string;
  color: string;
  onClick?: (e?: any) => void;
  width?: number;
  height: number;
  disabled?: any;
}

interface IBtnType {
  default: string;
  white: string;
  delete: string;
}
const Button = ({ text, color, onClick, width, height, disabled, ...props }: IProps) => {
  return (
    <Btn
      onClick={onClick}
      color={color}
      width={width}
      height={height}
      disabled={disabled}
      style={{ ...props.style }}
    >
      {text}
    </Btn>
  );
};

export default Button;

const ButtonType: IBtnType = {
  default: '#52D2A4',
  white: '#FFFFFF',
  delete: '#FF1F1F',
};

const Btn = styled.button<IProps>`
  cursor: pointer;
  height: ${({ height }) => `${height}rem`};
  width: ${({ width }) => `${width}rem`};
  border-radius: 0.3125rem;
  padding: 0.3125rem 0.625rem;
  font-size: 0.875rem;
  background-color: ${({ color }) => ButtonType[color as keyof IBtnType]};
  border: 2px solid
    ${({ color, theme }) => (color === 'white' ? theme.colors.primary : ButtonType[color as keyof IBtnType])};
  color: ${({ color, theme }) => (color === 'white' ? theme.colors.black : theme.colors.white)};
  font-weight: 700;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ color, theme }) =>
      color === 'white' ? theme.colors.primary : theme.colors.white};
    color: ${({ color }) => ButtonType[color as keyof IBtnType]};
  }
`;
