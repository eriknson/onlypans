import styled from 'styled-components';
import { colorBlue } from '../utils/colors';
import { gutter } from '../utils/constants';
import { useState, useEffect } from 'react';

const Wrapper = styled.div`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  width: 100%;
  display: flex;
  justify-content: center;
  transition: opacity 0.3s;
`;

const Balls = styled.div`
  margin: ${gutter * 2}px;
  width: 60px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;

  @keyframes wave {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(100%);
    }
  }

  div {
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background-color: ${colorBlue};
    transform: translateY(-100%);
    animation: wave 0.8s ease-in-out alternate infinite;
  }

  div:nth-of-type(1) {
    animation-delay: -0.4s;
  }

  div:nth-of-type(2) {
    animation-delay: -0.2s;
  }
`;

export default function Loader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setVisible(true);
    }, 350);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Wrapper visible={visible}>
      <Balls>
        <div />
        <div />
        <div />
      </Balls>
    </Wrapper>
  );
}
