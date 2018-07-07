import styled from 'styled-components';

export const vars = {
  mainColor: '#3f51b5',
  warning: '#d32f2f',
  boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
};

export const Container = styled.div`
  max-width: 1150px;
  padding: 0 10px;
  margin: 0 auto;
`;

export const Button = styled.button`
  padding: 5px 10px;
  color: #fff;
  font-family: Roboto;
  font-size: 1rem;
  background-color: ${vars.mainColor};
  border: none;
  cursor: pointer;
  transition: opacity .5s;

  &:hover {
    opacity: 0.7;
  }
`;

Button.displayName = 'Button';

export const ButtonReversed = Button.extend`
  color: ${vars.mainColor};
  background-color: #fff;
`;

export const NoRoomSelected = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #aaa;
  font-size: 2rem;
`;