import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  background: #119c54;
  border-radius: 4px;
  box-shadow: 3px 3px 10px black;
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: white;
  }

  svg {
    margin-right: 10px;
  }
`;

export default Container;
