import styled from 'styled-components';

interface IProps extends React.HTMLAttributes<HTMLElement> {
  text?: string;
  color: string;
  onClick?: (e?: any) => void;
  width: number;
  height: number;
  disabled?: any;
}

interface IBtnType {
  default: string;
  white: string;
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
};

const ButtonHoverType: IBtnType = {
  default: '#FFFFFF',
  white: '#52D2A4',
};

const Btn = styled.button<IProps>`
  cursor: pointer;
  height: ${({ height }) => `${height}rem`};
  width: ${({ width }) => `${width}rem`};
  border-radius: 0.3125rem;
  padding: 0.3125rem 0.625rem;
  font-size: 0.875rem;
  background-color: ${({ color }) => ButtonType[color as keyof IBtnType]};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ color, theme }) => (color === 'default' ? theme.colors.white : theme.colors.black)};
  font-weight: 700;
  transition: all 0.5s ease;

  &:hover {
    background-color: ${({ color, theme }) =>
      color === 'default' ? theme.colors.white : theme.colors.black};
    color: ${({ color }) => ButtonType[color as keyof IBtnType]};
    border: 2px solid ${({ theme }) => theme.colors.white};

  }
`;
