import styled, { css } from 'styled-components';

export default function Button({ text, isAccent, disabled, onClick, icon }) {
  return (
    <>
      <NormalButton
        isAccent={isAccent}
        disabled={disabled}
        type="button"
        onClick={onClick}
      >
        {icon} {text}
      </NormalButton>
    </>
  );
}

const NormalButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: ${props => (props.isAccent ? '#ff9c27' : '#687a48')};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 10px;
  width: 100%;

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #ddd;
      color: #eee;
    `};
`;
