import styled from 'styled-components';

interface IProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  color: string;
  onClick: () => void;
  width: number;
  height: number;
}

interface IButton {
  color: string;
  width: number;
  height: number;
}

interface IBtnType {
  default: string;
  white: string;
}
const Button = ({ text, color, onClick, width, height, ...props }: IProps) => {
  return (
    <Btn onClick={onClick} color={color} width={width} height={height} style={{ ...props.style }}>
      {text}
    </Btn>
  );
};

export default Button;

const ButtonType: IBtnType = {
  default: '#52D2A4',
  white: '#FFFFFF',
};

const Btn = styled.button<IButton>`
  cursor: pointer;
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  border: none;
  height: 30px;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  background-color: ${({ color }) => ButtonType[color as keyof IBtnType]};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ color, theme }) => (color === 'default' ? theme.colors.white : theme.colors.black)};
`;
