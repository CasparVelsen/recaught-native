import styled from 'styled-components';

export default function PageTitle({ text }) {
  return <Title>{text}</Title>;
}

const Title = styled.h1`
  color: #687a48;
  font-size: 32px;
  width: 50%;
  margin: 0;
`;
