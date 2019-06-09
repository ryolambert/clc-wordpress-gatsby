// const dropdownStyle = theme => ({
//   '@keyframes glow': {
//     from: {
//       boxShadow: '0 0 0px yellow'
//     },
//     to: {
//       boxShadow: '0 0 10px 1px yellow'
//     }
//   },
//   dropDown: {
//     position: 'absolute',
//     width: '100%',
//     zIndex: 100,
//     border: '1px solid gray'
//   },
//   dropDownItem: {
//     display: 'flex',
//     borderBottom: '1px solid lightgray',
//     background: '${props => (props.highlighted ? `#f7f7f7` : `white`)}',
//     padding: '1rem',
//     transition: 'all 0.2s',
//     borderLeft: '10px solid white',
//     alignItems: 'center',
//     '&:focus,&:hover': {
//       background: 'lightgray',
//       borderLeft: '10px solid lightgray',
//       paddingLeft: '2rem'
//     },
//     '&:img': {
//       marginRight: '10px'
//     }
//   },
//   searchStyles: {
//     position: 'relative',
//     '::input': {
//       width: '100%',
//       padding: '10px',
//       border: 0,
//       fontSize: '2rem',
//       '&:hover': {
//         animation: '$glow 0.5s ease-in-out infinite alternate'
//       }
//     }
//   }
// });

// export default dropdownStyle;
import styled, { keyframes } from 'styled-components';

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  max-height: 30vh;
  z-index: 1200;
  border: 1px solid ${props => props.theme.lightgray};
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid ${props => props.theme.lightgray};
  background: ${props => (props.highlighted ? '#f7f7f7' : 'white')};
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? 'padding-left: 2rem;' : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid
    ${props => (props.highlighted ? props.theme.lightgray : 'white')};
  img {
    margin-right: 10px;
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
  input {
    width: 100%;
    padding: 10px;
    border: 0;
    /* font-size: 2rem; */
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

export { DropDown, DropDownItem, SearchStyles };
