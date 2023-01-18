import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useToken } from '../contexts/TokenProvider';
import useMutation from '../api/useMutation';
import useAxios from '../api/useAxios';
import { IPost } from '../types/post';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

const UpdatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [channelId, setChannelId] = useState('');
  const { postId } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState({});
  const [previewImage, setPreviewImage] = useState('');

  const tokenContextObj = useToken();
  const token = tokenContextObj?.token;

  const { mutate } = useMutation();

  const handleTitleOnChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    localStorage.setItem(`tempTitleInUpdatePost${postId}`, e.target.value);
  };
  const handleContentOnChnage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    localStorage.setItem(`tempContentInUpdatePost${postId}`, e.target.value);
  };

  const { data } = useAxios<IPost>({
    url: `${END_POINT}/posts/${postId}`,
    method: 'get',
  });

  useEffect(() => {
    if (typeof data === 'object') {
      const post = JSON.parse(data?.title as string);
      setTitle(post.title);
      setContent(post.content);

      const tempTitle = localStorage.getItem(`tempTitleInUpdatePost${postId}`) || '';
      const tempContent = localStorage.getItem(`tempContentInUpdatePost${postId}`) || '';

      if (tempTitle) {
        setTitle(tempTitle);
      }
      if (tempContent) {
        setContent(tempContent);
      }

      setChannelId(data.channel._id);

      setImage(data.image as string);
    }
  }, [data]);

  const handleUpdatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postToUpdate = {
      title: title,
      content: content,
    };
    const jsonToUpdate = JSON.stringify(postToUpdate);

    const formData = new FormData();
    formData.append('postId', postId as string);
    formData.append('title', jsonToUpdate);
    formData.append('image', image as string);
    formData.append('channelId', channelId as string);

    mutate({
      url: `${END_POINT}/posts/update`,
      method: 'put',
      data: formData,
    }).then(() => {
      localStorage.removeItem('tempTitleInUpdatePost');
      localStorage.removeItem('tempContentInUpdatePost');

      navigate(`/post/${postId}`);
    });
  };

  const handleDeletePost = () => {
    mutate({
      url: `${END_POINT}/posts/delete`,
      method: 'delete',
      data: {
        id: postId,
      },
    }).then(() => navigate(`/channel/${channelId}`));
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
          setPreviewImage(reader.result as string);
        }
      };
    }
  };

  return (
    <Form onSubmit={handleUpdatePost}>
      <TitleInput value={title} onChange={handleTitleOnChnage} />
      <Div />
      <Image src={previewImage ? previewImage : data?.image}></Image>
      <Textarea onChange={handleContentOnChnage} rows={10} cols={100} value={content} placeholder='내용' />
      <Div />
      <ImageInput
        id='Image-file'
        type='file'
        accept='image/jpg,impge/png,image/jpeg,image/gif'
        onChange={handleOnClickUploadImage}
      />
      <Button type='submit'>내용 수정</Button>
      <Button onClick={handleDeletePost} backgroundColor={'red'}>
        글 삭제
      </Button>
    </Form>
  );
};

const Image = styled.img``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 725px;
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

const Button = styled.button<{ backgroundColor?: string }>`
  width: 200px;
  align-self: end;
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: #ffffff;
  color: #000000;
  border: solid ${(props) => props.backgroundColor};
  border-radius: 5%;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: ${(props) => props.backgroundColor};
  }
`;

export default UpdatePost;
