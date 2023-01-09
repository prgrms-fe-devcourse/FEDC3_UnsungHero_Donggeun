import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1a237e;
  height: 64px;
`;

export const ButtonWrapper = styled.div``;

export const Sidebar = styled.nav`
  background-color: #e8eaf6;
  position: fixed;
  margin-top: 64px;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 185px;
  height: 100%;
`;

export const ChannelTitle = styled.div`
  margin-bottom: 20px;
`;

export const Channel = styled.div`
  margin-bottom: 20px;
`;

export const Main = styled.div`
  margin-left: 200px;
`;
