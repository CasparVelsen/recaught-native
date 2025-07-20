import styled from 'styled-components';
import { createPortal } from 'react-dom';
import FlyBoxPopup from './FlyBoxPopup';
import { useState } from 'react';
import Button from '../Button';
import { HiPlusCircle } from 'react-icons/hi';
import { AiOutlineMinusCircle } from 'react-icons/ai';

const initialValues = {
  species: '',
  time: '',
  length: '',
  weight: '',
  bait: '',
  location: '',
  notes: '',
  _id: '',
};

export default function AddCatchPopup({
  handleAddCatch,
  profile,
  profileCards,
  closeAddCatchPopup,
}) {
  const [showFlyBox, setShowFlyBox] = useState(false);
  const [values, setValues] = useState(initialValues);

  const handleChange = event => {
    const { name, value } = event.target;
    const _id = Math.random();
    setValues({
      ...values,
      [name]: value,
      _id: _id,
      author: profile._id,
    });
  };

  const handleFlyChoice = bait => {
    setValues({
      ...values,
      bait: bait,
      _id: Math.random(),
      author: profile._id,
    });
    setShowFlyBox(prevState => !prevState);
  };

  const handleFlyBoxClick = () => {
    setShowFlyBox(prevState => !prevState);
  };
  return createPortal(
    <Overlay onClick={closeAddCatchPopup}>
      <Container onClick={e => e.stopPropagation()}>
        <Title>
          Add a catch
          <Closer onClick={closeAddCatchPopup}>
            <CloseButton>close</CloseButton>
            <AiOutlineMinusCircle color="#FF9C27" />
          </Closer>
        </Title>
        <Fieldset>
          <Data>
            <Term>species:</Term>
            <Input
              onChange={handleChange}
              value={values.species}
              id="species"
              name="species"
              type="text"
              maxLength={100}
            />
          </Data>
          <Data>
            <Term htmlFor="time">time</Term>
            <Input
              onChange={handleChange}
              value={values.time}
              id="time"
              name="time"
              type="time"
            />
          </Data>
          <Data>
            <Term htmlFor="length">length</Term>
            <Input
              onChange={handleChange}
              value={values.length}
              id="length"
              name="length"
              type="number"
              min={0}
              placeholder="cm"
            />
          </Data>
          <Data>
            <Term htmlFor="weight">weight</Term>
            <Input
              onChange={handleChange}
              value={values.weight}
              id="weight"
              name="weight"
              type="number"
              step={0.1}
              min={0}
              placeholder="kg"
            />
          </Data>
          <Part>
            <Wrapper>
              <Term htmlFor="bait">bait</Term>
              {!showFlyBox && (
                <FlyBoxButton onClick={handleFlyBoxClick}>flybox</FlyBoxButton>
              )}
              {showFlyBox && (
                <FlyBoxPopup
                  profileCards={profileCards}
                  handleChange={handleChange}
                  handleFlyChoice={handleFlyChoice}
                  handleFlyBoxClick={handleFlyBoxClick}
                />
              )}
            </Wrapper>
            <Input
              onChange={handleChange}
              value={values.bait}
              id="bait"
              name="bait"
              type="text"
              list="baitlist"
              maxLength={100}
            />
          </Part>
          <Data>
            <Term htmlFor="location">location</Term>
            <Input
              onChange={handleChange}
              value={values.location}
              id="location"
              name="location"
              type="text"
              maxLength={100}
            />
          </Data>
          <Data>
            <Term>notes</Term>
            <Input
              onChange={handleChange}
              value={values.notes}
              id="notes"
              name="notes"
              type="text"
              maxLength={300}
            />
          </Data>
        </Fieldset>
        <Button
          text="done"
          onClick={() => {
            handleAddCatch(values);
            setValues(initialValues);
          }}
          icon={<HiPlusCircle />}
          disabled={
            !values.species.trim() &&
            !values.time.trim() &&
            !values.length.trim() &&
            !values.weight.trim() &&
            !values.bait.trim() &&
            !values.location.trim() &&
            !values.notes.trim()
          }
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
  padding: 0;
  border: none;
  position: relative;
  font-size: 1rem;
  margin: 15px 0 25px 0;
`;

const Data = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.9rem;
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
`;

const Part = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
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
