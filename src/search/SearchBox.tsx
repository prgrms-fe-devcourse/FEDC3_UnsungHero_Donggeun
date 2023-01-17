import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';

interface IsearchBoxProps {
  setSelectedSearchOption: (value: string) => void;
  setInputSearchValue: (value: string) => void;
  getPostsList: () => void;
  getEntirePostsList: () => void;
  currentChannelId: string | undefined;
}

const SearchBox = ({
  setSelectedSearchOption,
  setInputSearchValue,
  getPostsList,
  getEntirePostsList,
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
      if (currentChannelId !== undefined) {
        getPostsList();
      } else if (currentChannelId === undefined) {
        getEntirePostsList();
      }
    },
    [inputValue, selectedOption, currentChannelId]
  );

  return (
    <SearchBoxForm onSubmit={handleSubmitForm}>
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

const SearchBoxForm = styled.form`
  display: flex;
  justify-content: center;
  width: 725px;
  margin: 20px 0 60px 40px;
`;

const SearchBoxSelect = styled.select`
  width: 120px;
  padding: 0.8em 0.5em;
  font-family: inherit;
  background: url(https://farm1.staticflickr.com/379/19928272501_4ef877c265_t.jpg) no-repeat 95% 50%; /* 네이티브 화살표 대체 */
  border: 1px solid #999;
  color: gray;
  border-radius: 0px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-shadow: 0 0.5px 0.5px rgba(0, 0, 0, 0.6);

  &::-ms-expand {
    display: none;
  }
`;

const SearchBoxInput = styled.input`
  width: 30rem;
  font-size: 16px;
  padding-left: 5px;
  border: 1px solid #999;
  border-left: none;
  border-right: none;
  box-shadow: 0 0.5px 0.5px rgba(0, 0, 0, 0.6);

  &::placeholder {
    font-size: 16px;
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
  border: 1px solid #999;
  border-left: none;
  box-shadow: 0 0.5px 0.5px rgba(0, 0, 0, 0.6);

  img {
    width: 30px;
    height: 30px;
    margin: 0 5px;
  }

  &:hover {
    background-color: #d3d3d3;
  }
`;
