import axios from 'axios';
import { useEffect, useState } from 'react';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';
const postId = '63bc3d1023d1e65ff38c5e77';

// 추후에 postId를 DetailPost의 props로 받아와서 보여주는 방식으로 구성하면될듯.
const DetailPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchPost = async () => {
    try {
      const result = await axios
        .get(`${END_POINT}/posts/${postId}`)
        .then((res) => res.data)
        .catch((e) => {
          console.log(e);
        });
      const post = JSON.parse(result.title);
      setTitle(post.title);
      setContent(post.content);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);
  console.log(title, content);

  return (
    <div>
      <h1>Detail Post Page</h1>
      {title}
      <br />
      {content}
    </div>
  );
};

export default DetailPost;
