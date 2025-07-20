import styled from 'styled-components';

export default function Summary({ handleOnChange }) {
  return (
    <>
      <Title>Summary:</Title>
      <Fieldset>
        <Part>
          <label htmlFor="bites">Total bites</label>
          <Input
            id="bites"
            name="bites"
            type="number"
            min={0}
            onChange={handleOnChange}
          />
        </Part>
        <Part>
          <label htmlFor="lost">Lost fish</label>
          <Input
            id="lost"
            name="lost"
            type="number"
            min={0}
            onChange={handleOnChange}
          />
        </Part>
      </Fieldset>
    </>
  );
}

const Title = styled.div`
  color: #687a48;
  font-weight: bold;
  font-size: 1.3rem;
  margin-top: 20px;
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
`;
