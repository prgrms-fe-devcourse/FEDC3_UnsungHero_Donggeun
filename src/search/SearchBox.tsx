import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface IPathname {
  pathname: string;
}
interface IsearchBoxProps {
  setSelectedSearchOption: (value: string) => void;
  setInputSearchValue: (value: string) => void;
  setIsMobileSearching: (value: boolean) => void;
  currentChannelId: string | undefined;
}

const SearchBox = ({
  setSelectedSearchOption,
  setInputSearchValue,
  setIsMobileSearching,
  currentChannelId,
}: IsearchBoxProps) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('제목');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue('');
    setSelectedOption('제목');
  }, [currentChannelId]);

  const handleChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  }, []);

  const handleChangeSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedOption(e.target.value);
  }, []);

  const handleSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      setSelectedSearchOption(selectedOption);
      setInputSearchValue(inputValue);
      setIsMobileSearching(false);
    },
    [inputValue, selectedOption, currentChannelId]
  );

  const pathname = useLocation().pathname;

  return (
    <SearchBoxForm onSubmit={handleSubmitForm} pathname={pathname}>
      <SearchBoxSelect onChange={handleChangeSelect} value={selectedOption}>
        <option>제목</option>
        <option>제목+내용</option>
        <option>작성자</option>
      </SearchBoxSelect>
      <SearchBoxInput
        onChange={handleChangeInput}
        value={inputValue}
        ref={inputRef}
        placeholder='검색어를 입력해 주세요'
      />
      <SearchBoxButton>
        <img
          src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FX9cU5%2FbtrWxqIaO38%2Fu7NYxkURgqR6rsqlRKFjR1%2Fimg.png'
          alt='돋보기'
        />
      </SearchBoxButton>
    </SearchBoxForm>
  );
};

export default SearchBox;

const SearchBoxForm = styled.form<IPathname>`
  display: flex;
  justify-content: center;
  width: 45.3125rem;
  margin: 2rem 0;

  @media (max-width: ${({ theme }) => theme.media.moblie}) {
    display: ${(pathname) => `${pathname?.pathname?.includes('search') ? 'flex' : 'none'}`};
    width: 100%;
  }
`;

const SearchBoxSelect = styled.select`
  cursor: pointer;
  width: 8rem;
  /* width: 100%; */
  padding: 0.625rem;
  font-family: inherit;
  border-radius: 10%;
  background: url(https://farm1.staticflickr.com/379/19928272501_4ef877c265_t.jpg) no-repeat 95% 50%; /* 네이티브 화살표 대체 */
  border: 0.0625rem solid ${({ theme }) => theme.colors.contentLine};
  color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 0rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 2px 3px ${({ theme }) => theme.colors.shadow};
  margin-right: 1rem;
  border-radius: 0.3125rem;
  &::-ms-expand {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.media.moblie}) {
    margin-right: 5px;
    font-size: 12px;
  }
`;

const SearchBoxInput = styled.input`
  width: 37rem;
  font-size: 1rem;
  padding-left: 0.3125rem;
  border: 0.0625rem solid ${({ theme }) => theme.colors.contentLine};
  border-right: none;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 2px 3px ${({ theme }) => theme.colors.shadow};
  border-top-left-radius: 0.3125rem;
  border-bottom-left-radius: 0.3125rem;
  &::placeholder {
    font-size: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.media.moblie}) {
    width: 55vw;

    &::placeholder {
      font-size: small;
      padding-bottom: 10px;
    }
  }
`;

const SearchBoxButton = styled.button`
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  overflow: visible;
  cursor: pointer;
  border: 0.0625rem solid ${({ theme }) => theme.colors.contentLine};
  border-left: none;
  box-shadow: 0px 2px 3px ${({ theme }) => theme.colors.shadow};
  background-color: ${({ theme }) => theme.colors.white};
  border-top-right-radius: 0.3125rem;
  border-bottom-right-radius: 0.3125rem;
  img {
    width: 1.875rem;
    height: 1.875rem;
    margin: 0 0.3125rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayHover};
    transition: all 0.2s ease;
  }
`;
