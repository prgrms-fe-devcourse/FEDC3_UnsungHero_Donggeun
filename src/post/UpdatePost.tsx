import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useMutation from '../api/useMutation';
import { IPost } from '../types/post';
import { useQuery } from 'react-query';
import { Button } from '../common';
import { END_POINT } from '../api/apiAddress';
import axios from 'axios';
import Loading from '../api/Loading';
import { ILoading } from './CreatePost';
import { maxImageSize } from '../api/constValue';

const UpdatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [channelId, setChannelId] = useState('');
  const { postId } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState({});
  const [previewImage, setPreviewImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation();

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    localStorage.setItem(`tempTitleInUpdatePost${postId}`, e.target.value);
  };
  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    localStorage.setItem(`tempContentInUpdatePost${postId}`, e.target.value);
  };

  const { data: updatePost } = useQuery<IPost>([postId], async () => {
    return axios.get(`${END_POINT}/posts/${postId}`).then(({ data }) => data);
  });

  useEffect(() => {
    if (typeof updatePost === 'object') {
      const post = JSON.parse(updatePost?.title as string);
      setTitle(post.title);
      setContent(post.content);

      const tempTitle = localStorage.getItem(`tempTitleInUpdatePost${postId}`) || '';
      const tempContent = localStorage.getItem(`tempContentInUpdatePost${postId}`) || '';
      if (tempTitle !== '' || tempContent !== '') {
        if (confirm('수정중인 글을 불러올까요?')) {
          if (tempTitle !== '') setTitle(tempTitle);
          if (tempContent !== '') setContent(tempContent);
        } else {
          localStorage.removeItem(`tempTitleInUpdatePost${postId}`);
          localStorage.removeItem(`tempContentInUpdatePost${postId}`);
        }
      }

      setChannelId(updatePost.channel._id);
      setImage(updatePost.image as string);
    }
  }, [updatePost]);

  const handleSubmitUpdatePost = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    if (title.length === 0) {
      return alert('제목은 필수입니다!');
    }

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
      localStorage.removeItem(`tempTitleInUpdatePost${postId}`);
      localStorage.removeItem(`tempContentInUpdatePost${postId}`);
      setIsLoading(false);
      navigate(`/post/${postId}`, { replace: true });
    });
  };

  const handleOnClickDeletePost = () => {
    if (confirm('글을 삭제하시겠습니까?')) {
      mutate({
        url: `${END_POINT}/posts/delete`,
        method: 'delete',
        data: {
          id: postId,
        },
      }).then(() => navigate(`/channel/${channelId}`, { replace: true }));
    }
  };

  // CreatePost에 있는 함수와 동일함. 추후에 파일로 따로 뺴면 좋을듯.
  const handleOnClickUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];
      const fileSize = file.size;

      if (fileSize > maxImageSize) {
        e.currentTarget.value = '';
        setImage({});
        setPreviewImage('');
        return alert('첨부파일 사이즈는 5MB 이내로 등록 가능합니다.');
      }

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
    <Wrapper isLoading={isLoading}>
      {isLoading && <Loading />}
      <Form onSubmit={handleSubmitUpdatePost}>
        <TitleInput value={title} onChange={handleChangeTitle} />
        <Content>
          <ImageWarpper>
            <Image src={previewImage ? previewImage : updatePost?.image}></Image>
          </ImageWarpper>
          <Textarea onChange={handleChangeContent} rows={10} cols={100} value={content} placeholder='내용' />
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
          <Button text='글 삭제' color='delete' onClick={handleOnClickDeletePost} width={8} height={1.875} />
        </ButtonContainer>
      </Form>
    </Wrapper>
  );
};
const Wrapper = styled.div<ILoading>`
  position: ${({ isLoading }) => isLoading && 'fixed'};
  margin-top: 1.875rem;
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    width: 100vw;
    border-radius: none;
  }
`;

const Image = styled.img`
  max-height: 31.25rem;
  max-width: 43.3125rem;
  margin: 1rem 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1.875rem;
  padding: 1rem;
  min-height: 40rem;
  max-width: 45.3125rem;
  border-radius: 5px;
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
  min-height: 32.5rem;
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

const ImageWarpper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageInput = styled.input`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 3%;
  cursor: pointer;
  &::file-selector-button {
    cursor: pointer;
    border: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;

export default UpdatePost;
