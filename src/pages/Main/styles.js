import styled, { keyframes, css } from 'styled-components';

export const Head = styled.div`
  display: flex;
  max-width: 500px;
  background: #119c54;
  color: white;
  box-shadow: 3px 3px 10px black;
  justify-content: center;
  align-items: center;
  margin: 80px auto;
  padding: 10px;
  h1 {
    font-size: 24px;
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid ${props => (props.error ? '#ff6b6b' : '#eee')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;

    &[error] {
      border: 2px solid red;
    }
  }
`;

const rotate = keyframes`
from{
  transform: rotate(0deg);
}
to{
  transform: rotate(360deg);
}

`;
export const Erro1 = styled.div`
  display: ${props => (props.error ? 'flex' : 'none')};
  color: red;
  font-size: 16px;
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.load
}))`
  background: red;
  border: 0;
  padding: 0 10px;
  margin-left: 5px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.load &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;
  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid grey;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;
