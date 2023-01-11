/**
 * 현재 unFollow 기능이 정상적으로 작동하지 않습니다.
 */
import axios from 'axios';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';
const followed = '63be4d1dad5c5114f90103e5'; // 팔로우 당하는 계정 id
const following = '63be4d05ad5c5114f90103ca'; // 팔로우 하는 계정 id

interface temp {
  user: string;
}

const Follow = () => {
  const token = localStorage.getItem('TOKEN_KEY'); // 팔로우 하는 계정 token

  const body = {
    _id: followed,
  };
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `bearer ${token}`,
  };

  const handleOnClickFollow = () => {
    axios.get(`${END_POINT}/auth-user`, { headers }).then((res) => {
      const { data } = res;
      let check = true;

      if (data.following.find(({ user }: temp) => user === followed)) check = false;

      if (check) {
        axios
          .post(`${END_POINT}/follow/create`, body, { headers })
          .then((res) => console.log(res.data))
          .catch((e) => console.log(e));
      }
    });
  };

  // UnFollow 기능이 정상적으로 작동하지 않습니다.
  const handleOnClickUnFollow = () => {
    axios.post(`${END_POINT}/login`, { email: 'following', password: '123' }).then((res) => {
      const { data } = res;
      const temp = data.user.following.find((i: any) => i.user === followed);
      console.log({ ...temp });

      axios
        .delete(`${END_POINT}/follow/delete`, {
          data: { id: '63be4d1dad5c5114f90103e5' }, // 팔로우 당하는 계정.
          headers,
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    });
  };

  return (
    <div>
      <h1>Follow TEST</h1>
      <button onClick={handleOnClickFollow}>팔로우 하기</button>
      <button onClick={handleOnClickUnFollow}>팔로우 취소 하기</button>
    </div>
  );
};

export default Follow;
