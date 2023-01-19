import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const Error404Navigator = useNavigate();

  return (
    <Error404Container>
      <Button onClick={() => Error404Navigator('/')}>MAIN PAGE</Button>
      <Error404Image src='https://blog.kakaocdn.net/dn/zGSzi/btrWKyyMq7W/E9nOytAI8egXyTqyGEAvQ0/img.gif'></Error404Image>
    </Error404Container>
  );
};

export default NotFound;

const Error404Container = styled.div`
  padding-top: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1500px;
  height: 1200px;
`;

const Error404Image = styled.img`
  width: 1500px;
  margin: 10px;
  padding-left: 800px;
`;

const Button = styled.button`
  width: 150px;
  height: 40px;
  color: white;
  margin-left: 600px;
  background: #52d2a4;
  border-radius: 5px;
  cursor: pointer;
  border: 0.0625rem solid ${({ theme }) => theme.colors.contentLine};
  box-shadow: 0px 2px 3px ${({ theme }) => theme.colors.shadow};
`;
