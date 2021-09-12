import styled from "styled-components";
import icon from '../../icons/loading.svg';

const Spinner = ()=> {

  return (
    <SpinnerIcon src={icon}/>
  )

}


export default Spinner;


export const SpinnerIcon = styled.img`
  position: absolute;
  top: 80%;
  left: 35%;
  width: 7rem;
  height: 7rem;
  animation: anim-spinner 1s linear infinite;

  @keyframes anim-spinner {
    to {
      transform: rotate(360deg);
    }
  }

  @media screen and (min-width: 500px){
    left: 40%;
  }

  @media screen and (min-width: 1024px){
    left: 45%;
  }
`