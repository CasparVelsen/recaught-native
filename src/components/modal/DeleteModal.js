import Button from '../Button';
import styled from 'styled-components';

export default function DeleteModal({ text, confirmDelete, cancelDelete }) {
  return (
    <Overlay onClick={cancelDelete}>
      <Container onClick={e => e.stopPropagation()}>
        <Description>Do you really want to delete this {text}?</Description>
        <Buttons>
          <Button text="Yes" isAccent={true} onClick={confirmDelete} />
          <Button text="No" isAccent={false} onClick={cancelDelete} />
        </Buttons>
      </Container>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background: rgba(0, 0, 0, 0.025);
  z-index: 999;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  gap: 5px;
  font-size: 1rem;
  color: #a2c36c;
  border-radius: 20px;
  padding: 15px 20px 10px 20px;
  border: 0.5px solid #ddd;
  width: 90%;

  position: fixed;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 100;
`;

const Description = styled.p`
  font-size: 1.1rem;
  font-weight: normal;
  color: #687a48;
  padding: 0;
  margin: 0;
  text-align: center;
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;
