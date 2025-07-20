import styled from 'styled-components';
import { createPortal } from 'react-dom';
import FlyBoxPopup from './FlyBoxPopup';
import { useState } from 'react';
import Button from '../Button';
import { HiPlusCircle, HiOutlineTrash } from 'react-icons/hi';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import SpeciesSelect from '../SpeciesSelect';

export default function EditCatchPopup({
  selectedCatch,
  profile,
  profileCards,
  closeEditCatchPopup,
  handleEditCatch,
  handleDeleteCatch,
}) {
  const [editCatchData, setEditCatchData] = useState(selectedCatch);
  const [showFlyBox, setShowFlyBox] = useState(false);

  const handleFlyChoice = bait => {
    setEditCatchData({
      ...editCatchData,
      bait: bait,
      author: profile._id,
    });
    setShowFlyBox(prevState => !prevState);
  };

  const handleFlyBoxClick = () => {
    setShowFlyBox(prevState => !prevState);
  };

  return createPortal(
    <Overlay onClick={closeEditCatchPopup}>
      <Container onClick={e => e.stopPropagation()}>
        <Title>
          Edit catch
          <Closer onClick={closeEditCatchPopup}>
            <CloseButton>close</CloseButton>
            <AiOutlineMinusCircle color="#FF9C27" />
          </Closer>
        </Title>
        <Fieldset>
          <Part>
            <Term>species:</Term>
            <SpeciesSelect
              value={editCatchData.species}
              onChange={selectedValue =>
                setEditCatchData(prev => ({
                  ...prev,
                  species: selectedValue,
                }))
              }
            />
          </Part>
          <Part>
            <Term htmlFor="time">time</Term>
            <Input
              onChange={e =>
                setEditCatchData({ ...editCatchData, time: e.target.value })
              }
              value={editCatchData.time}
              id="time"
              name="time"
              type="time"
            />
          </Part>
          <Part>
            <Term htmlFor="length">length</Term>
            <Input
              onChange={e =>
                setEditCatchData({ ...editCatchData, length: e.target.value })
              }
              value={editCatchData.length}
              id="length"
              name="length"
              type="number"
              min={0}
              placeholder="cm"
            />
          </Part>
          <Part>
            <Term htmlFor="weight">weight</Term>
            <Input
              onChange={e =>
                setEditCatchData({ ...editCatchData, weight: e.target.value })
              }
              value={editCatchData.weight}
              id="weight"
              name="weight"
              type="number"
              step={0.1}
              min={0}
              placeholder="kg"
            />
          </Part>
          <Part>
            <Wrapper>
              <Term htmlFor="bait">bait</Term>
              {!showFlyBox && (
                <FlyBoxButton onClick={handleFlyBoxClick}>flybox</FlyBoxButton>
              )}
              {showFlyBox && (
                <FlyBoxPopup
                  profileCards={profileCards}
                  handleFlyChoice={handleFlyChoice}
                  handleFlyBoxClick={handleFlyBoxClick}
                />
              )}
            </Wrapper>
            <Input
              onChange={e =>
                setEditCatchData({ ...editCatchData, bait: e.target.value })
              }
              value={editCatchData.bait}
              id="bait"
              name="bait"
              type="text"
              list="baitlist"
              maxLength={100}
            />
          </Part>
          <Part>
            <Term htmlFor="location">location</Term>
            <Input
              onChange={e =>
                setEditCatchData({ ...editCatchData, location: e.target.value })
              }
              value={editCatchData.location}
              id="location"
              name="location"
              type="text"
              maxLength={100}
            />
          </Part>
          <Part>
            <Term>notes</Term>
            <Input
              onChange={e =>
                setEditCatchData({ ...editCatchData, notes: e.target.value })
              }
              value={editCatchData.notes}
              id="notes"
              name="notes"
              type="text"
              maxLength={300}
            />
          </Part>
          <Part>
            <Term htmlFor="taken">taken?</Term>
            <ToggleWrapper
              onClick={() =>
                setEditCatchData(prev => ({
                  ...prev,
                  taken: !prev.taken,
                }))
              }
            >
              <Toggle checked={editCatchData.taken}>
                <Dot checked={editCatchData.taken} />
              </Toggle>
              <HiddenCheckbox
                id="taken"
                name="taken"
                checked={editCatchData.taken}
                onChange={() => {}} // optional, da wir onClick am Wrapper haben
              />
            </ToggleWrapper>
          </Part>
        </Fieldset>
        <Button
          text="done"
          onClick={() => {
            handleEditCatch(editCatchData);
          }}
          icon={<HiPlusCircle />}
        />
        <Button
          text="delete"
          isAccent={true}
          onClick={() => {
            handleDeleteCatch(editCatchData._id);
          }}
          icon={<HiOutlineTrash />}
        />
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
`;

const Title = styled.div`
  color: #687a48;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Fieldset = styled.fieldset`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 10px 0 20px;
  margin: 0;
  border: none;
  position: relative;
  font-size: 1rem;
`;

const Part = styled.div`
  display: flex;
  flex-direction: column;
`;

const Term = styled.div`
  font-size: 1rem;
  color: #a2c36c;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #ff9c27;
  padding: 2px 5px;
  border-radius: 5px;
  color: #aaa;
  background-color: white;
  height: 25px;
  font-size: 0.9rem;

  &::placeholder {
    color: #aaa;
    font-size: 0.8rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    margin-left: 8px;
    color: #687a48;
  }
`;

const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1rem;
  font-weight: bold;
  color: #ff9c27;
  padding: 0;
`;

const FlyBoxButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 12px;
  font-weight: bold;
  color: #ff9c27;
  padding: 0;
`;

const Closer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ToggleWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 24px;
  margin-top: 4px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const Toggle = styled.div`
  width: 42px;
  height: 22px;
  background: ${props => (props.checked ? '#FF9C27' : '#ccc')};
  border-radius: 999px;
  position: relative;
  transition: background 0.3s;
`;

const Dot = styled.div`
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${props => (props.checked ? '22px' : '2px')};
  transition: left 0.3s;
`;
