import styled from 'styled-components';
import { useState } from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';

export default function Water({ handleOnChange }) {
  const [showInputs, setShowInputs] = useState(true);
  function toggleShowInputs() {
    setShowInputs(!showInputs);
  }

  return (
    <>
      <Section>
        <div onClick={toggleShowInputs}>
          <Title>
            Add water data:
            {showInputs && (
              <AiOutlinePlusCircle onClick={toggleShowInputs} color="#FF9C27" />
            )}
            {!showInputs && (
              <AiOutlineMinusCircle
                onClick={toggleShowInputs}
                color="#FF9C27"
              />
            )}
          </Title>
        </div>
        {!showInputs && (
          <Fieldset>
            <Part>
              <label htmlFor="stretch">Stretch</label>
              <Input
                id="stretch"
                name="stretch"
                type="text"
                maxLength={100}
                onChange={handleOnChange}
              />
            </Part>
            <Part>
              <label htmlFor="watertemp">Water temperature</label>
              <Input
                id="watertemp"
                name="watertemp"
                type="number"
                min={-5}
                max={50}
                onChange={handleOnChange}
                placeholder="°C"
              />
            </Part>
            <Part>
              <label htmlFor="watercolor">Water Color</label>
              <Select
                id="watercolor"
                name="watercolor"
                type="text"
                onChange={handleOnChange}
              >
                <option value="cloudy">cloudy</option>
                <option value="slightly cloudy">slightly cloudy</option>
                <option value="clear">clear</option>
              </Select>
            </Part>
            <Part>
              <label htmlFor="waterlevel">Water Level</label>
              <Select
                id="waterlevel"
                name="waterlevel"
                type="text"
                onChange={handleOnChange}
              >
                <option value="low">low</option>
                <option value="normal">normal</option>
                <option value="high">high</option>
              </Select>
            </Part>
          </Fieldset>
        )}
      </Section>
    </>
  );
}

const Section = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 5px 10px;
  border: 0.5px solid #a2c36c;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
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
  padding: 10px 0 30px;
  border: none;
  position: relative;
  font-size: 1rem;
`;

const Part = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #ff9c27;
  padding: 2px 5px;
  border-radius: 5px;
  color: #aaa;
  background-color: white;
  height: 25px;

  &::placeholder {
    color: #aaa;
    font-size: 0.8rem;
  }
`;

const Select = styled.select`
  width: 100%;
  border: 1px solid #ff9c27;
  padding: 2px 5px;
  border-radius: 5px;
  color: #aaa;
  background-color: white;
  height: 25px;
`;
