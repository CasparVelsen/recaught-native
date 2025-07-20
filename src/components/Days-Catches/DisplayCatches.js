import CatchCard from './CatchCard';
import styled, { keyframes } from 'styled-components';
import Loader from '../Loader';

export default function DisplayCatches({ filteredCards }) {
  const catches = filteredCards.flatMap(entry => entry.catches);

  return (
    <>
      <Catches>
        {catches.length > 0 ? (
          catches.map((data, tempId, _id) => (
            <li key={tempId}>
              <CatchCard data={data} />
            </li>
          ))
        ) : (
          <div>
            <LoaderBox>
              <Loader />
            </LoaderBox>
            <Error>no matches found</Error>
          </div>
        )}
      </Catches>
    </>
  );
}

const Catches = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px; 
  list-style: none;
  padding: 0;
  width: 100%;
  margin: 0 auto; 
  margin: 20px 0 68px 0; 
  box-sizing: border-box:
`;

const fadeOut = keyframes`
  from {color: #687a48;}
  to {color: white;}
`;

const LoaderBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: fixed;
  top: 55%;
  animation-name: ${fadeOut};
  animation-delay: 3s;
  animation-duration: 0s;
  animation-fill-mode: forwards;
  padding-right: 10px;
`;

const fadeIn = keyframes`
  from {color: white;}
  to {color: #687a48;}
`;

const Error = styled.div`
  width: 100%;
  text-align: center;
  color: white;
  font-weight: bold;
  position: fixed;
  top: 58%;
  animation-name: ${fadeIn};
  animation-delay: 3s;
  animation-duration: 0s;
  animation-fill-mode: forwards;
  padding-right: 10px;
`;
