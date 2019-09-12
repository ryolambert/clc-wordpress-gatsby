import styled, { keyframes } from 'styled-components';
import { fade } from '@material-ui/core/styles';

const DropDown = styled.div`
  position: absolute;
  color: inherit;
  border-radius: 5px;
  width: 100%;
  max-height: 35vh;
  z-index: 100;
  /* border: 1px solid ${props => props.theme.lightgrey}; */
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    width: 10px;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(#0080ff),
      to(#00d2d2)
    );
    background-image: linear-gradient(120deg, #0080ff 0%, #00d2d2 100%);
    box-shadow: inset 2px 2px 2px rgba(255, 255, 255, 0.25),
      inset -2px -2px 2px rgba(0, 0, 0, 0.25);
  }
  ::-webkit-scrollbar-track {
    /* background-color: #fff; */
    opacity: 0.8;
    background-color: lightgray;
  }
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid lightgray;
  background: ${props =>
    props.highlighted
      ? 'linear-gradient(25deg,  #ffc526 0%, #ff6600 130%)'
      : 'white'};
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  transition: background-size 0.25s ease-in;
  background-color: white;
  padding: 1rem;
  transition: all 0.2s;
  max-width: 100%;
  /* max-height: 5rem; */
  display: flex;
  flex-direction: row;
  ${props => (props.highlighted ? 'padding-left: 2rem;' : null)};
  align-items: center;
  border-left: 10px solid ${props => (props.highlighted ? '#ff6600' : 'white')};
  transition: background-size 0.25s ease-in;
  h5 {
    font-weight: 700;
    color: black;
    text-shadow: '0.05em 0.08em 0.2em rgba(0,0,0,.85)';
    transform: skew(5px);
    font-family: 'Roboto Slab';
    margin-right: 10px;
    flex: 0 1 50px;
    background-image: linear-gradient(120deg, #0080ff 0%, #00d2d2 100%);
    background-repeat: no-repeat;
    background-size: 100% 0.2em;
    background-position: 0 88%;
    transition: background-size 0.25s ease-in;
    &:hover {
      background-size: 100% 88%;
      color: white;
      text-shadow: '0.05em 0.08em 0.2em rgba(0,0,0,.85)';
      transition: background-size 0.25s ease-in;
    }
  }
  p {
    color: #000000;
    flex: 1 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-height: 1rem; /* fallback */
    max-height: 2rem; /* fallback */
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }

  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const SearchStyles = styled.div`
  position: relative;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  margin-top: 5;
  input {
    width: 100%;
    padding: 10px;
    border: 0;
    border-radius: 5px;
    background-color: ${fade('#fff', 0.15)};
    &:focus {
      background-color: ${fade('#fff', 0.25)};
      /* width: 40vw; */
    }
    color: inherit;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

export { DropDown, DropDownItem, SearchStyles };
