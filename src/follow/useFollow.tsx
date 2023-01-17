import axios from 'axios';
import { useState, useEffect } from 'react';
import useAxios from '../api/useAxios';
import useMutation from '../api/useMutation';
import { useToken, useUserId } from '../contexts/TokenProvider';
import { IFollow } from '../types/follow';
import { IUser } from '../types/user';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

interface IFollowList {
  followers: string[];
  following: string[];
}

const useFollow = (currentPageId: string) => {
  const userIdContext = useUserId();
  const tokenContext = useToken();
  const { data: LoginUserData, fetchData: fetchLoginUserData } = useAxios<IUser>({
    url: `${END_POINT}/users/${userIdContext?.userId}`,
    method: 'get',
  });
  const { data: currentData, fetchData: fetchCurrentData } = useAxios<IUser>({
    url: `${END_POINT}/users/${currentPageId}`,
    method: 'get',
  });
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
  }, [currentData, LoginUserData]);

  useEffect(() => {
    fetchCurrentData();
  }, [currentPageId]);

  const produceFollowNotification = () => {
    const body = {
      notificationType: 'FOLLOW',
      notificationTypeId: currentData?.followers[currentData?.followers.length - 1]._id,
      userId: currentData?._id,
      postId: null,
    };

    mutate({
      url: `http://kdt.frontend.3rd.programmers.co.kr:5006/notifications/create`,
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
      .then(({ data }) => {
        const target = data?.followers.find(({ follower }: IFollow) => follower === userIdContext?.userId);
        mutate({
          url: `${END_POINT}/follow/delete`,
          method: 'delete',
          data: {
            id: target?._id,
          },
        });
      });

    await fetchCurrentData();
    await fetchLoginUserData();
  };

  const followButton = (id: string) => {
    if (id === userIdContext?.userId) return;

    const following = LoginUserData?.following.map((user) => user.user);
    return following?.includes(id) ? (
      <button onClick={(e) => handleClickUnFollow(e, id)}>언팔로우하기</button>
    ) : (
      <button onClick={(e) => handleClickFollow(e, id)}>팔로우하기</button>
    );
  };

  return { followButton, userFollow };
};

export default useFollow;
