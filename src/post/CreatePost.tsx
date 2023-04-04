import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useToken } from '../contexts/TokenProvider';
import useMutation from '../api/useMutation';
import { Button } from '../common';
import { END_POINT } from '../api/apiAddress';
import Loading from '../api/Loading';
import { maxImageSize } from '../api/constValue';

export interface ILoading {
  isLoading: boolean;
}

function CreatePost() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState({});
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [previewImage, setPreviewImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { channelId } = useParams<string>();

  const navigate = useNavigate();

  const tokenContextObj = useToken();
  const token = tokenContextObj?.token;

  const { mutate } = useMutation();

  const initTitle = localStorage.getItem(`tempTitleInCreatePost${channelId}`) || '';
  const initContent = localStorage.getItem(`tempContentInCreatePost${channelId}`) || '';

  useEffect(() => {
    if (initTitle !== '' || initContent !== '') {
      if (confirm('작성중인 글이 존재합니다. 불러오시겠습니까?')) {
        if (initTitle !== '') setTitle(initTitle);
        if (initContent !== '') setContent(initContent);
      } else {
        localStorage.removeItem(`tempTitleInCreatePost${channelId}`);
        localStorage.removeItem(`tempContentInCreatePost${channelId}`);
        setTitle('');
        setContent('');
      }
    }
  }, [channelId]);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 75) {
      e.target.value = e.target.value.slice(0, 75);
    }

    setTitle(e.target.value);
    localStorage.setItem(`tempTitleInCreatePost${channelId}`, e.target.value);
  };
  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    localStorage.setItem(`tempContentInCreatePost${channelId}`, e.target.value);
  };

  const handleOnClickCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length === 0) {
      return alert('제목은 필수 입니다!');
    }

    setIsLoading(true);
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
      setIsLoading(false);
      navigate(`/post/${_id}`, { replace: true });
    });
  };

  // updatePost에 있는 함수와 동일함. 추후에 파일로 따로 뺴면 좋을듯.
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
      <Form onSubmit={handleOnClickCreatePost}>
        <TitleInput
          type='text'
          size={99}
          onChange={handleChangeTitle}
          value={title}
          placeholder='제목을 입력하세요.'
        />
        <Content>
          <ImageWrapper>
            <Image src={previewImage ? previewImage : ''}></Image>
          </ImageWrapper>
          <Textarea
            rows={20}
            cols={100}
            onChange={handleChangeContent}
            placeholder='내용을 입력하세요.'
            value={content}
            ref={textareaRef}
          />
        </Content>
        <ImageInput
          id='Image-file'
          type='file'
          accept='image/jpg,impge/png,image/jpeg,image/gif'
          onChange={handleOnClickUploadImage}
        />
        <Button
          text='저장'
          color='default'
          width={10}
          height={2.5}
          style={{ marginLeft: 'auto', margin: '16px 0 16px auto' }}
        />
      </Form>
    </Wrapper>
  );
}

export default CreatePost;

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
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  max-width: 45.3125rem;
  border-radius: 5px;
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
  line-height: 180%;
  font-size: ${({ theme }) => theme.fontSize.medium};
  width: 100%;
  min-height: 32.5rem;
  margin: 0.625rem;
  padding-bottom: 0.625rem;
  &:focus {
    outline: none;
  }
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #60606080;
    border-radius: 10px;
  }
`;

const Content = styled.div`
  min-height: 32.5rem;
  padding: 1rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.contentLine};
  border-bottom: 1px solid ${({ theme }) => theme.colors.contentLine};
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageInput = styled.input`
  padding: 1rem 0;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 3%;
  cursor: pointer;
  &::file-selector-button {
    padding: 0.5rem;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    transition: all 0.2s ease;
    &:hover {
      background-color: ${({ theme }) => `${theme.colors.lightGray}80`};
    }
  }
`;
