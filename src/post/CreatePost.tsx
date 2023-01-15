import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useToken } from '../contexts/TokenProvider';
import useMutation from '../api/useMutation';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

const Container = styled.div`
  max-width: 50%;
  display: flex;
  flex-direction: column;
`;

function CreatePost() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState('');

  const { channelId } = useParams<string>();

  const navigate = useNavigate();

  const tokenContextObj = useToken();
  const token = tokenContextObj?.token;

  const { mutate } = useMutation();

  const initTitle = localStorage.getItem('tempTitleInCreatePost') || '';
  const initContent = localStorage.getItem('tempContentInCreatePost') || '';
  useEffect(() => {
    setTitle(initTitle);
    setContent(initContent);
  }, []);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    localStorage.setItem('tempTitleInCreatePost', e.target.value);
  };
  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    localStorage.setItem('tempContentInCreatePost', e.target.value);
  };

  const handleOnClickCreatePost = async () => {
    if (!token) return;

    const newPost = {
      title: title,
      content: content,
    };
    const newPostChangedToJson = JSON.stringify(newPost);

    const contentData = {
      title: newPostChangedToJson,
      image: image,
      channelId: channelId,
    };

    mutate({
      url: `${END_POINT}/posts/create`,
      method: 'post',
      data: {
        ...contentData,
      },
    }).then((res) => {
      localStorage.removeItem('tempTitleInCreatePost');
      localStorage.removeItem('tempContentInCreatePost');

      const { _id } = res;
      navigate(`/post/${_id}`);
    });
  };

  const handleOnClickUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };

  return (
    <Container>
      <h1>글 작성 페이지</h1>
      <input
        type='text'
        size={99}
        onChange={(e) => handleChangeTitle(e)}
        value={initTitle}
        placeholder='제목을 입력하세요'
      />
      <br />
      <textarea
        rows={10}
        cols={100}
        onChange={handleChangeContent}
        placeholder='내용을 입력하세요'
        value={initContent}
      />
      <br />
      <input
        type='file'
        accept='image/jpg,impge/png,image/jpeg,image/gif'
        onChange={handleOnClickUploadImage}
      />
      <button onClick={handleOnClickCreatePost}>글 작성</button>
    </Container>
  );
}

export default CreatePost;
