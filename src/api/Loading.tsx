import styled from 'styled-components';

const Loading = () => {
  const sizeStyle = {
    width: 100,
    height: 100,
  };
  return (
    <LoadingBackground>
      <Icon>
        <svg viewBox='0 0 38 38' xmlns='https://www.w3.org/2000/svg' style={sizeStyle}>
          <g fill='none' fillRule='evenodd'>
            <g transform='translate(1 1)'>
              <path d='M36 18c0-9.94-8.06-18-18-18' stroke={'#919EAB'} strokeWidth='2'>
                <animateTransform
                  attributeName='transform'
                  type='rotate'
                  from='0 18 18'
                  to='360 18 18'
                  dur='0.9s'
                  repeatCount='indefinite'
                />
              </path>
              <circle fill={'#919EAB'} cx='36' cy='18' r='1'>
                <animateTransform
                  attributeName='transform'
                  type='rotate'
                  from='0 18 18'
                  to='360 18 18'
                  dur='0.9s'
                  repeatCount='indefinite'
                />
              </circle>
            </g>
          </g>
        </svg>
      </Icon>
    </LoadingBackground>
  );
};

export default Loading;

const Icon = styled.i`
  display: inline-block;
  vertical-align: middle;
`;

const LoadingBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #ffffffb7;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
