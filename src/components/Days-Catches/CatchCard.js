import { GiWeight } from 'react-icons/gi';
import { BiRuler } from 'react-icons/bi';
import styled from 'styled-components';

export default function CatchCard({ data }) {
  return (
    <Card>
      <Title>{data?.species || '?'}</Title>
      <span>
        <BiRuler size={30} color={'#687a48'} />
        {data.length || '?'} cm
      </span>
      <span>
        <GiWeight size={30} color={'#687a48'} />
        {data?.weight || '?'} kg
      </span>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  padding: 10px;
  background-color: #fffcf8;
  font-size: 1rem;
  color: #a2c36c;
  border: 0.5px solid #a2c36c;
  border-radius: 20px;
  box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 300px;
  box-sizing: border-box;

  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    margin: 0 2px;
  }
`;

const Title = styled.h2`
  font-size: 4vw;
  padding-bottom: 10px;
  margin: 0;
  color: #687a48;
  text-align: center;
  border-bottom: 2px dotted #a2c36c;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
`;

