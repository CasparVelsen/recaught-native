import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';

export default function WaterFilter ({filteredCardsByTime, handleChange, handleSubmit}) {

    const allWaterInManyArrays = filteredCardsByTime?.map(obj => obj.water) || [];
    
    const eachWater = [...new Set(allWaterInManyArrays)];
    

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <Select id="water" name="selectedWater" onChange={handleChange}>
                    <option value="">All waters</option>
                    {eachWater.map((opt, id) => (
                        <option key={id}>{opt}</option>
                    ))}
                </Select>
            </form>
            <IoIosArrowDown color="#687a48" />
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
  font-size: 24px;
  font-weight: bold;
  color: #687a48;
  text-align: right;
  text-align-last: right;
  -webkit-appearance: none; /* verhindert, dass der Browser eigene Styles draufhaut */
  -moz-appearance: none;
  appearance: none;

  &:focus {
    outline: none;  /* Keine Umrandung bei Fokus */
    border: none;   /* Keine Border bei Fokus */
  }
`;