import Cards from './DayCard';
import styled, { keyframes } from 'styled-components';
import Loader from '../Loader';

export default function DisplayDays({
  filteredCards,
  showModal,
  handleDelete,
  confirmDelete,
  cancelDelete,
  handleEdit,
  profile,
  profileCards,
}) {
  return (
    <>
      <CardsList>
        {filteredCards.length > 0 ? (
          filteredCards.map((data, tempId) => (
            <li key={tempId}>
              <Cards
                data={data}
                showModal={showModal}
                onDelete={handleDelete}
                confirmDelete={confirmDelete}
                cancelDelete={cancelDelete}
                handleEdit={handleEdit}
                profile={profile}
                profileCards={profileCards}
              />
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
      </CardsList>
    </>
  );
}

const CardsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;
  padding: 0;
  width: 100%;
  margin-bottom: 68px;
  height: 100%;
  position: relative;
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
