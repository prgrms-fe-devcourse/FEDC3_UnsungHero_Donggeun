import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorBoundary from '../api/ErrorBoundary';
import Comment from '../comment';
import Like from '../like';

import useAxios from '../api/useAxios';
import { IPost } from '../types/post';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';
//const postId = '63bc3d1023d1e65ff38c5e77';

// 추후에 postId를 DetailPost의 props로 받아와서 보여주는 방식으로 구성하면될듯.
const DetailPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { postId } = useParams();

  const navigate = useNavigate();

  // const { data, fetchData } = useAxios<IPost>({
  //   url: `${END_POINT}/posts/${postId}`,
  //   method: 'get',
  // });

  // //  JSON.parse(data.title);
  // console.log({ ...data });

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

  const handleOnClickToUpdatePage = () => {
    navigate(`/post/channelId/${postId}`);
  };

  return (
    <ErrorBoundary>
      <h1>Detail Post Page</h1>
      <h1>제목: {title}</h1>
      <h2>내용: {content}</h2>
      <br />
      <button onClick={handleOnClickToUpdatePage}>내용 수정 페이지로 가기</button>
      <Comment />
      <Like />
    </ErrorBoundary>
  );
};

export default DetailPost;
