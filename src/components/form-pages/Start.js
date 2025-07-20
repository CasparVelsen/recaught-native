import styled from 'styled-components';
import ScreenRaderOnly from '../ScreenRaderOnly';
import moment from 'moment';

export default function Start({ handleOnChange }) {
  return (
    <>
      <Title>General infos:</Title>
      <Fieldset>
        <Part>
          <label htmlFor="date">
            Date * <Hint>(no future dates)</Hint>
          </label>
          <Input
            id="date"
            name="date"
            type="date"
            max={moment().format('YYYY-MM-DD')}
            onChange={handleOnChange}
            required
          />
        </Part>
        <Part>
          <label htmlFor="water">
            Water *<ScreenRaderOnly>Waters</ScreenRaderOnly>
          </label>
          <Input
            id="water"
            name="water"
            type="text"
            maxLength={25}
            onChange={handleOnChange}
            required
          />
        </Part>
        <Species>
          <label htmlFor="target">Target species *</label>
          <Input
            id="target"
            name="target"
            type="text"
            maxLength={25}
            onChange={handleOnChange}
            required
          />
        </Species>
      </Fieldset>
    </>
  );
}

const Title = styled.div`
  color: #687a48;
  font-weight: bold;
  font-size: 1.3rem;
`;

const Fieldset = styled.fieldset`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
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

const Species = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
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
    color: #ddd;
    font-size: 0.8rem;
  }
`;

const Hint = styled.small`
  font-size: 0.8rem;
  color: #aaa;
`;
