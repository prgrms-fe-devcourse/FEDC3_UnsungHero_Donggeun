import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useToken } from '../contexts/TokenProvider';
import useMutation from '../api/useMutation';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

function CreatePost() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState({});

  const { channelId } = useParams<string>();

  const navigate = useNavigate();

  const tokenContextObj = useToken();
  const token = tokenContextObj?.token;

  const { mutate } = useMutation();

  const initTitle = localStorage.getItem(`tempTitleInCreatePost${channelId}`) || '';
  const initContent = localStorage.getItem(`tempContentInCreatePost${channelId}`) || '';
  useEffect(() => {
    setTitle(initTitle);
    setContent(initContent);
  }, []);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    localStorage.setItem(`tempTitleInCreatePost${channelId}`, e.target.value);
  };
  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    localStorage.setItem(`tempContentInCreatePost${channelId}`, e.target.value);
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

    const formData = new FormData();
    if (channelId) {
      formData.append('title', newPostChangedToJson);
      formData.append('image', JSON.stringify(image));
      formData.append('channelId', channelId);
    }
    console.log(formData);

    mutate({
      url: `${END_POINT}/posts/create`,
      method: 'post',
      data: {
        formData,
      },
    }).then((res) => {
      localStorage.removeItem(`tempTitleInCreatePost${channelId}`);
      localStorage.removeItem(`tempContentInCreatePost${channelId}`);

      const { _id } = res;
      navigate(`/post/${_id}`);
    });
  };

  const handleOnClickUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);

      console.log(reader);
      setImage(file);
    }
  };

  return (
    <Container>
      <Title>글 작성 페이지</Title>
      <input
        type='text'
        size={99}
        onChange={(e) => handleChangeTitle(e)}
        value={initTitle}
        placeholder='제목을 입력하세요'
      />
      <br />
      <Textarea
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
      <Button onClick={handleOnClickCreatePost}>저장</Button>
    </Container>
  );
}

const Title = styled.h1``;

const Container = styled.div`
  margin: 5rem;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  border: solid 1px black;
`;

const Textarea = styled.textarea`
  resize: none;
  border: none;
`;

const Button = styled.button`
  align-self: end;
  width: 10%;
  background-color: #52d2a4;
  color: #ffffff;
`;

export default CreatePost;
