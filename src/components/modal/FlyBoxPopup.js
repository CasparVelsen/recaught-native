import styled from 'styled-components';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { createPortal } from 'react-dom';

export default function FlyBoxPopup({
  profileCards,
  handleFlyChoice,
  handleFlyBoxClick,
}) {
  const findBaits = profileCards
    .map(card => card.catches.map(data => data.bait).flat())
    .flat();
  const baits = [...new Set(findBaits)].sort();

  return createPortal(
    <Overlay onClick={handleFlyBoxClick}>
      <Container onClick={e => e.stopPropagation()}>
        <Title>
          My Flies
          <Closer>
            <FlyBoxButton onClick={handleFlyBoxClick}>close</FlyBoxButton>
            <AiOutlineMinusCircle color="#FF9C27" onClick={handleFlyBoxClick} />
          </Closer>
        </Title>
        <ScrollableContainer>
          {baits.map((bait, index) => (
            <Bait
              key={index}
              type="button"
              onClick={() => handleFlyChoice(bait)}
            >
              {bait}
            </Bait>
          ))}
        </ScrollableContainer>
      </Container>
    </Overlay>,
    document.body
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999; /* Overlay muss hinter dem Popup liegen */
`;

const Container = styled.div`
  background-color: #fffcf8;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #687a48;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Zentriert den Container */
  width: 80%; /* Oder jede gewünschte Breite */
  max-width: 600px; /* Optional: Maximale Breite für größere Bildschirme */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Damit der Container vor allem anderen liegt */
  display: flex;
  flex-direction: column;
  height: 400px; /* Feste Höhe für das Popup */
`;

const Closer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Bait = styled.button`
  font-size: 1rem;
  padding: 5px 0 5px;
  border: 0;
  background-color: transparent;
  color: #a2c36c;
  text-align: left;
  width: 100%;
`;

const FlyBoxButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1rem;
  font-weight: bold;
  color: #ff9c27;
  padding: 0;
`;

const Title = styled.div`
  color: #687a48;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ScrollableContainer = styled.div`
  flex-grow: 1; /* Füllt den restlichen Platz im Container */
  overflow-y: auto; /* Ermöglicht das Scrollen, wenn der Inhalt zu lang wird */
  padding-right: 10px; /* Ein wenig Abstand zu rechten Rand für das Scrollen */
  margin-top: 10px; /* Abstand zum oberen Inhalt */
`;
