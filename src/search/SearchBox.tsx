import React, { useState, useRef, useCallback } from 'react';
import { FunctionComponent } from 'react';

type SearchBoxProps = {
  searchPostList: (selectedValue: string, inputValue: string) => void;
};

const SearchBox: FunctionComponent<SearchBoxProps> = ({ searchPostList }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('제목');
  const inputRef = useRef(null);

  const onSubmitForm = useCallback((e: any): void => {
    e.preventDefault();
    searchPostList(selectedValue, inputValue);
    // inputRef.current.focus();
  }, []);

  const onChangeInput = useCallback((e: any): void => {
    setInputValue(e.target.value);
  }, []);

  const onChangeSelect = useCallback((e: any): void => {
    setSelectedValue(e.target.value);
  }, []);

  return (
    <form onSubmit={onSubmitForm}>
      <select onChange={onChangeSelect} value={selectedValue}>
        <option>제목</option>
        <option>제목+내용</option>
        <option>작성자</option>
      </select>
      <input onChange={onChangeInput} value={inputValue} ref={inputRef} />
      <button>검색</button>
    </form>
  );
};

export default SearchBox;
