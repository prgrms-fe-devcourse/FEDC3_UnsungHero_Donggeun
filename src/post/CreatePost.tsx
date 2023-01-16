import React, { useEffect, useState } from 'react';
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

  const handleOnClickCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) return;

    const newPost = {
      title: title,
      content: content,
    };
    const newPostChangedToJson = JSON.stringify(newPost);

    const formData = new FormData();
    formData.append('title', newPostChangedToJson);
    formData.append('image', image as string);
    formData.append('channelId', channelId as string);

    mutate({
      url: `${END_POINT}/posts/create`,
      method: 'post',
      data: formData,
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

      // onload는 읽기 동작이 성공적으로 완료되었을 때 발생함.
      reader.onload = () => {
        // 작업 완료.
        if (reader.readyState === 2) {
          setImage(file);
        }
      };
    }
  };

  return (
    <Form onSubmit={(e) => handleOnClickCreatePost(e)}>
      <TitleInput
        type='text'
        size={99}
        onChange={(e) => handleChangeTitle(e)}
        value={initTitle}
        placeholder='제목을 입력하세요.'
      />
      <Div />
      <Textarea
        rows={20}
        cols={100}
        onChange={handleChangeContent}
        placeholder='내용을 입력하세요.'
        value={initContent}
      />
      <Div />
      {/* <Label className='image-fill-upload-button' htmlFor='Image-file'>
        이미지 업로드
      </Label> */}
      <ImageInput
        id='Image-file'
        type='file'
        accept='image/jpg,impge/png,image/jpeg,image/gif'
        onChange={handleOnClickUploadImage}
      />
      <Div />
      <Button type='submit'>저장</Button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 5rem;
  padding: 1rem;
  max-width: 50%;
  border: solid 1px #c4c4c4;
  border-radius: 3%;
  box-shadow: 12px 12px 2px 1px rgba(216, 216, 235, 0.2);
`;

const TitleInput = styled.input`
  border: none;
  font-size: 20px;
  &:focus {
    background-color: #fafafa;
    outline: none;
  }
`;

const Div = styled.div`
  width: 98%;
  border: solid #c4c4c4 1px;
  margin: 1rem 0;
  justify-content: center;
`;

const Textarea = styled.textarea`
  resize: none;
  border: none;
  font-size: 16px;
  &:focus {
    background-color: #fafafa;
    outline: none;
  }
`;

const Label = styled.label`
  color: #ffffff;
  padding: 0.5rem;
  background-color: #52d2a4;
  border-radius: 5%;
`;

const ImageInput = styled.input`
  padding: 0.5rem;
  background-color: #fafafa;
  border-radius: 3%;
  cursor: pointer;
  &::file-selector-button {
    cursor: pointer;
    border: none;
    /* background-color: #52d2a4; */
  }
`;

const Button = styled.button`
  margin: 0.5rem;
  padding: 0.5rem;
  width: 200px;
  align-self: end;
  border: none;
  border-radius: 5%;

  background-color: #52d2a4;
  color: #ffffff;
`;

export default CreatePost;
