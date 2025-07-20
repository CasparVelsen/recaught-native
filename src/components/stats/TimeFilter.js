import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';

export default function TimeFilter({
  profileCards,
  handleChange,
  handleSubmit,
}) {
  const allYearsInManyArrays =
    profileCards?.map(object => {
      const year = new Date(object.date).getFullYear();
      return year;
    }) || [];

  const eachYear = [...new Set(allYearsInManyArrays)];

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <Select id="season" name="selectedSeason" onChange={handleChange}>
          <option value="">All time</option>
          {eachYear.map((opt, id) => (
            <option key={id}>{opt}</option>
          ))}
        </Select>
      </form>
      <IoIosArrowDown color="#ff9c27" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
`;

const Select = styled.select`
  border: none;
  background-color: transparent;
  font-size: 28px;
  font-weight: bold;
  color: #ff9c27;
  text-align: right;
  text-align-last: right;
  -webkit-appearance: none; /* verhindert, dass der Browser eigene Styles draufhaut */
  -moz-appearance: none;
  appearance: none;

  &:focus {
    outline: none; /* Keine Umrandung bei Fokus */
    border: none; /* Keine Border bei Fokus */
  }
`;
