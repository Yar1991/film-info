import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';

const Footer = ()=> {

  const { status, movieList } = useSelector(state => state.movies);

  return (
    <>
      {status === 'success' && movieList && movieList.length > 0 ? <FooterBox>
        <FooterContent>made by .Y. using <FooterLink href="https://www.themoviedb.org/" rel='noreferrer' target="_blank" title='The Movie Database'>TMDB</FooterLink></FooterContent>
      </FooterBox> : ''}
    </>
  )

}


export default Footer;


const FooterBox = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-color);
  color: #242424;
`

const FooterContent = styled.p`
  padding: 1rem 0;
`

const FooterLink = styled.a`
  color: #a6c3d6;
  transition: color 0.4s ease;

  &:hover {
    color: #b6d6eb;
  }
`