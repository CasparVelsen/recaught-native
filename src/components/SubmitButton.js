import styled, { css } from 'styled-components';
import { HiCheckCircle } from 'react-icons/hi';

export default function SubmitButton({ text, isAccent, disabled }) {
  return (
    <>
      <Button isAccent={isAccent} type="submit" disabled={disabled}>
        {text}
        <HiCheckCircle />
      </Button>
    </>
  );
}

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: ${props => (props.isAccent ? '#FF9C27' : '#A2C36C')};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;

  :hover {
    transform: scale(1.1);
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #ddd;
      color: #eee;
    `};
`;
