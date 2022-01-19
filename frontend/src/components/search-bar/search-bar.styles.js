import styled from 'styled-components';

//------------------------------------------------------------------------
//                              SEARCH BAR
//------------------------------------------------------------------------
export const SearchBarContainer = styled.form`
  flex: 0 0 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media only screen and (max-width: 1300px) {
    flex: 0 0 70%;
  }

  @media only screen and (max-width: 650px) {
    flex: 0 0 100%;
    order: 1;
  }
`;

export const SearchInput = styled.input`
  font-family: inherit;
  font-size: inherit;
  background-color: transparent;
  color: inherit;
  background-color: var(--color-grey-light-2);
  box-shadow: 0 0 0 30px var(--color-grey-light-2) inset !important;
  -webkit-box-shadow: 0 0 0 30px var(--color-grey-light-2) inset !important;
  border: none;
  padding: 1rem 2rem;
  border-radius: 100px;
  height: 100%;
  width: 90%;
  transition: all 0.2s;

  &:focus {
    outline: none;
    width: 100%;
    background-color: var(--color-grey-light-3);
    box-shadow: 0 0 0 30px var(--color-grey-light-3) inset !important;
    -webkit-box-shadow: 0 0 0 30px var(--color-grey-light-3) inset !important;
  }

  &:-webkit-autofill {
    box-shadow: 0 0 0 30px var(--color-grey-light-2) inset !important;
    -webkit-box-shadow: 0 0 0 30px var(--color-grey-light-2) inset !important;
  }

  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    box-shadow: 0 0 0 30px var(--color-grey-light-3) inset !important;
    -webkit-box-shadow: 0 0 0 30px var(--color-grey-light-3) inset !important;
  }

  &::-webkit-input-placeholder {
    font-weight: 300;
    color: var(--color-grey-light-4);
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  } 
`;

export const SearchButton = styled.button`
  border: none;
  background-color: transparent;
  margin-left: -3.4rem;


  & svg {
    font-size: 1.8rem;
    color: var(--color-grey-dark-3);
  }

  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(2px);
  }
`;
