import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar } from '../common';
import useFollow from '../hooks/useFollow';

interface IFollowList {
  _id: string;
  image: string | undefined;
  fullName: string;
}

const FollowListItem = ({ _id, image, fullName }: IFollowList) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { followButton } = useFollow(id as string);

  const handleOnClickMoveUserPage = (id: string) => {
    navigate(`/user/${id}`);
  };

  return (
    <>
      <div key={_id} onClick={() => handleOnClickMoveUserPage(_id)}>
        <UserWrapper>
          <Avatar src={image} width={80} height={80} />
          <UserName>{fullName}</UserName>
          {followButton(_id)}
        </UserWrapper>
      </div>
    </>
  );
};

export default FollowListItem;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.contentLine};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.grayHover};
  }
`;

const UserName = styled.span`
  padding-left: 1rem;
`;
