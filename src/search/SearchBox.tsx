import React, { useState, useRef, useCallback } from 'react';
import { FunctionComponent } from 'react';

interface SearchBoxProps {
  setSelectedSearchValue: (value: string) => void;
  setInputSearchValue: (value: string) => void;
  getPostsList: () => void;
}

const SearchBox: FunctionComponent<SearchBoxProps> = ({
  setSelectedSearchValue,
  setInputSearchValue,
  getPostsList,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('제목');
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  }, []);

  const onChangeSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedValue(e.target.value);
  }, []);

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      setSelectedSearchValue(selectedValue);
      setInputSearchValue(inputValue);
      getPostsList();
    },
    [inputValue, selectedValue]
  );

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
