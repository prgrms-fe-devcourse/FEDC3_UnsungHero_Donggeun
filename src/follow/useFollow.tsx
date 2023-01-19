import axios from 'axios';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import useMutation from '../api/useMutation';
import { Button } from '../common';
import { useToken, useUserId } from '../contexts/TokenProvider';
import { IFollow } from '../types/follow';
import { IUser } from '../types/user';
import { END_POINT } from '../api/apiAddress';

interface IFollowList {
  followers: string[];
  following: string[];
}

const useFollow = (currentPageId: string) => {
  const userIdContext = useUserId();
  const tokenContext = useToken();

  const { data: loginUserData, refetch: fetchLoginUserData } = useQuery<IUser>(
    ['userPage', 'loginUserId'],
    async () => {
      return axios.get(`${END_POINT}/users/${userIdContext?.userId}`).then(({ data }) => data);
    }
  );

  const { data: currentData, refetch: fetchCurrentData } = useQuery<IUser>(
    ['userPage', 'currentUserId'],
    async () => {
      return axios.get(`${END_POINT}/users/${currentPageId}`).then(({ data }) => data);
    },
    {
      refetchOnMount: true,
      staleTime: 3000,
    }
  );

  const { mutate } = useMutation();
  const [userFollow, setUserFollow] = useState<IFollowList>({
    followers: [],
    following: [],
  });
  const [firstClickCheck, setFirstClickCheck] = useState(false);

  useEffect(() => {
    const followerList = currentData?.followers.map((user: IFollow) => user.follower);
    const followingList = currentData?.following.map((user: IFollow) => user.user);

    setUserFollow({
      followers: followerList as [],
      following: followingList as [],
    });

    if (firstClickCheck) produceFollowNotification();
  }, [currentData, loginUserData]);

  const produceFollowNotification = () => {
    const body = {
      notificationType: 'FOLLOW',
      notificationTypeId: currentData?.followers[currentData?.followers.length - 1]._id,
      userId: currentData?._id,
      postId: null,
    };

    mutate({
      url: `${END_POINT}/notifications/create`,
      method: 'post',
      data: {
        ...body,
      },
    });
    setFirstClickCheck(false);
  };

  const handleClickFollow = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    await mutate({
      url: `${END_POINT}/follow/create`,
      method: 'post',
      data: {
        userId: id,
      },
    });

    await fetchCurrentData();
    await fetchLoginUserData();
    setFirstClickCheck(true);
  };

  const handleClickUnFollow = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    await axios
      .get(`${END_POINT}/users/${id}`, {
        headers: {
          Authorization: `bearer ${tokenContext?.token}`,
        },
      })
      .then(async ({ data }) => {
        const target = data?.followers.find(({ follower }: IFollow) => follower === userIdContext?.userId);
        await mutate({
          url: `${END_POINT}/follow/delete`,
          method: 'delete',
          data: {
            id: target?._id,
          },
        });

        await fetchCurrentData();
        await fetchLoginUserData();
      });
  };

  const followButton = (id: string) => {
    if (id === userIdContext?.userId) return;

    const following = loginUserData?.following.map((user) => user.user);
    return following?.includes(id) ? (
      <Button
        text={'언팔로우'}
        color={'white'}
        onClick={(e) => handleClickUnFollow(e, id)}
        width={6.25}
        height={1.875}
        style={{ marginLeft: 'auto' }}
      />
    ) : (
      <Button
        text={'팔로우'}
        color={'default'}
        onClick={(e) => handleClickFollow(e, id)}
        width={6.25}
        height={1.875}
        style={{ marginLeft: 'auto' }}
      />
    );
  };

  return { followButton, userFollow, currentData, fetchCurrentData };
};

export default useFollow;
