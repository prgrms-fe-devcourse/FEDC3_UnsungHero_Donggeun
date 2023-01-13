import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ErrorBoundary from '../api/ErrorBoundary';
import Comment from '../comment';
import Like from '../like';
import useAxios from '../api/useAxios';
import { IPost } from '../types/post';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

const Container = styled.div`
  max-width: 50%;
  display: flex;
  flex-direction: column;
`;

// 추후에 postId를 DetailPost의 props로 받아와서 보여주는 방식으로 구성하면될듯.
const DetailPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { postId } = useParams();

  const token = localStorage.getItem('token');

  const navigate = useNavigate();

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
    //fetchData();
  }, []);

  // const { data, fetchData } = useAxios<IPost>({
  //   url: `${END_POINT}/posts/${postId}`,
  //   method: 'get',
  // });

  // setTitle(JSON.parse(data?.title).title);
  // const temp = data?.title as string;
  //   if (temp) console.log(setTitle(JSON.parse(temp).title));

  const handleOnClickToUpdatePage = () => {
    navigate(`/post/channelId/updatePost/${postId}`);
  };

  return (
    <ErrorBoundary>
      <Container>
        <h1>Detail Post Page</h1>
        <h1>제목: {title}</h1>
        <textarea value={content} disabled rows={10} cols={100} />
        <br />
        {token ? <button onClick={handleOnClickToUpdatePage}>내용 수정 페이지로 가기</button> : null}
        <Comment />
        <Like />
      </Container>
    </ErrorBoundary>
  );
};

export default DetailPost;
