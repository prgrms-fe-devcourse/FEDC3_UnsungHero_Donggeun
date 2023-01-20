import styled from 'styled-components';

interface ICircle {
  size: number;
}

interface IBox {
  width: number | string;
  height: number | string;
}

const Base = styled.div`
  display: inline-block;
  border-radius: 4px;
  background-image: linear-gradient(
    90deg,
    rgba(232, 232, 232, 1) 0%,
    rgba(249, 248, 248, 1) 51%,
    rgba(232, 232, 232, 1) 100%
  );
  background-size: 200% 100%;
  background-position: 0 center;
  animation: skeleton--zoom-in 0.2s ease-out, skeleton--loading 2s infinite linear;

  @keyframes skeleton--zoom-in {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes skeleton--loading {
    0% {
      background-position-x: 100%;
    }
    50% {
      background-position-x: -100%;
    }
    100% {
      background-position-x: -100%;
    }
  }
`;

const Circle = styled(Base)<ICircle>`
  width: ${({ size }) => (typeof size === 'number' ? `${size}px` : size)};
  height: ${({ size }) => (typeof size === 'number' ? `${size}px` : size)};
  border-radius: 50%;
`;

const Box = styled(Base)<IBox>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
`;

function Paragraph({ line = 3, ...props }) {
  return (
    <div {...props} style={{ ...props.style }}>
      {Array.from(Array(line), (_, index) =>
        index !== line - 1 ? (
          <Box width='100%' height={16} key={index} />
        ) : (
          <Box width='64%' height={16} key={index} />
        )
      )}
    </div>
  );
}

const Skeleton = {
  Box,
  Circle,
  Paragraph,
};

export default Skeleton;
