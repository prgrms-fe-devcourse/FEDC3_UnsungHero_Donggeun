import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useMutation from '../api/useMutation';
import useAxios from '../api/useAxios';
import { IPost } from '../types/post';
import { Button } from '../common';
import { END_POINT } from '../api/apiAddress';

const UpdatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [channelId, setChannelId] = useState('');
  const { postId } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState({});
  const [previewImage, setPreviewImage] = useState('');

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
      <Content>
        <Image src={previewImage ? previewImage : ''}></Image>
        <Textarea rows={10} cols={100} onChange={handleContentOnChnage} value={content} placeholder='내용' />
      </Content>
      <ImageInput
        id='Image-file'
        type='file'
        accept='image/jpg,impge/png,image/jpeg,image/gif'
        onChange={handleOnClickUploadImage}
      />
      <ButtonContainer>
        <Button
          text='내용 수정'
          color='default'
          width={8}
          height={1.875}
          style={{ marginRight: '2.25rem' }}
        />
        <Button text='글 삭제' color='delete' onClick={handleDeletePost} width={8} height={1.875} />
      </ButtonContainer>
    </Form>
  );
};

const Image = styled.img``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  min-height: 40rem;
  width: 45.3125rem;
  border-radius: 3%;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
`;

const TitleInput = styled.input`
  border: none;
  font-size: ${({ theme }) => theme.fontSize.larger};
  font-weight: bold;
  margin: 0.625rem;
  padding-bottom: 0.625rem;
  &:focus {
    outline: none;
  }
`;

const Textarea = styled.textarea`
  resize: none;
  border: none;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.medium};
  &:focus {
    outline: none;
  }
`;

const Content = styled.div`
  min-height: 32.5rem;
  padding: 1rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.contentLine};
  border-bottom: 1px solid ${({ theme }) => theme.colors.contentLine};
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;

export default UpdatePost;
