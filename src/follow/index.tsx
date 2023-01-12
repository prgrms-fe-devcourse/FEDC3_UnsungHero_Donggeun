import axios from 'axios';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';
const followed = '63be4d1dad5c5114f90103e5'; // 팔로우 당하는 계정 id
const following = '63be4d05ad5c5114f90103ca'; // 팔로우 하는 계정 id

interface temp {
  user: string;
}

const Follow = () => {
  const token = localStorage.getItem('TOKEN_KEY'); // 팔로우 하는 계정 token

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `bearer ${token}`,
  };

  const handleOnClickFollow = () => {
    axios.get(`${END_POINT}/auth-user`, { headers }).then((res) => {
      const { data } = res;

      const target = data.following.find(({ user }: temp) => user === followed);

      if (!target) {
        axios
          .post(`${END_POINT}/follow/create`, { id: followed }, { headers })
          .then((res) => console.log(res.data))
          .catch((e) => console.log(e));
      }
    });
  };

  /**
   * 계정 정보를 받아온다.
   * 내가 언팔할 유저의 정보가 following에 있는지 찾는다.
   * 있다면 해당 'follow'의 'id'를 delete 요청으로 삭제한다.
   */
  const handleOnClickUnFollow = () => {
    axios.get(`${END_POINT}/auth-user`, { headers }).then((res) => {
      const { data } = res;

      const target = data.following.find(({ user }: temp) => user === followed);

      if (target) {
        axios
          .delete(`${END_POINT}/follow/delete`, {
            data: {
              id: target._id,
            },
            headers,
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      }
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
