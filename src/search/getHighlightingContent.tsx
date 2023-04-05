import styled from 'styled-components';

export const getHighlightingContent = (content: string, searchedValue: string) => {
  const title = content.toLowerCase().trim();
  const searchValue = searchedValue.toLowerCase().trim();
  if (searchValue !== '' && title.includes(searchValue)) {
    const matchText = content.split(new RegExp(`(${searchValue})`, 'gi'));
    return (
      <>
        {matchText.map((text, index) =>
          text.toLowerCase() === searchValue.toLowerCase() ? <Span key={index}>{text}</Span> : text
        )}
      </>
    );
  }
  return content;
};

const Span = styled.span`
  background-color: #a6ffc6;
  border-radius: 5px;
`;
