import styled from 'styled-components/macro';
import { motion } from 'framer-motion';
import { setPageIndex, setQueryType } from '../Movies/moviesReducer';
import { useDispatch } from 'react-redux';
import { useRef, useEffect, useState } from 'react';

const Navbar = ()=> {

  const dispatch = useDispatch();
  const movieRef = useRef(null);
  const tvRef = useRef(null);
  const [prevLink, setPrevLink] = useState(null);

  useEffect(()=> {
    if(movieRef){
      movieRef.current.style.color = '#dbeeff';
    }
  }, []);

  const animNav = {
    from: {
      opacity: 0,
      y: -200,
    },
    to: {
      opacity: 1,
      y: 0,
      transition: {
        ease: 'circOut',
        duration: 1
      }
    }
  }

  const toHome = ()=> {
    movieRef.current.style.color = '#dbeeff';
    tvRef.current.style.color = '#242424';
    if(prevLink) prevLink.style.color = '#242424';
    dispatch(setQueryType(''));
    dispatch(setPageIndex(1));
  }

  const moviesQuery  = (e)=> {
    let target = e.target.textContent.toLowerCase();
    let targetLink = e.target;
    if(prevLink) prevLink.style.color = '#242424';
    movieRef.current.style.color = '#dbeeff';
    tvRef.current.style.color = '#242424';
    targetLink.style.color = '#2f80b3'; 
    setPrevLink(targetLink);
    switch(target){
      case 'popular':
        dispatch(setQueryType('movie/popular'));
        dispatch(setPageIndex(1));
        break;
      case 'top rated':
        dispatch(setQueryType('movie/top_rated'));
        dispatch(setPageIndex(1));
        break;
      case 'upcoming':
        dispatch(setQueryType('movie/upcoming'));
        dispatch(setPageIndex(1));
        break;
      default:
        break;
    }
  }

  const showsQuery  = (e)=> {
    let target = e.target.textContent.toLowerCase();
    let targetLink = e.target;
    if(prevLink) prevLink.style.color = '#242424';
    tvRef.current.style.color = '#dbeeff';
    movieRef.current.style.color = '#242424';
    targetLink.style.color = '#2f80b3'; 
    setPrevLink(targetLink);
    switch(target){
      case 'popular':
        dispatch(setQueryType('tv/popular'));
        dispatch(setPageIndex(1));
        break;
      case 'top rated':
        dispatch(setQueryType('tv/top_rated'));
        dispatch(setPageIndex(1));
        break;
      default:
        break;
    }
  }

  return (
    <Nav variants={animNav} initial='from' animate='to'>
      <Container>
        <Logo onClick={toHome}>FilmInfo</Logo>
        <Options>
          <Option>
            <OptionHeading ref={movieRef}>Movies</OptionHeading>
            <DropMenu>
              <DropLi><DropLink href="#" title='popular' onClick={moviesQuery}>Popular</DropLink></DropLi>
              <DropLi><DropLink href="#" title='top rated' onClick={moviesQuery}>Top Rated</DropLink></DropLi>
              <DropLi><DropLink href="#" title='upcoming' onClick={moviesQuery}>Upcoming</DropLink></DropLi>
            </DropMenu>
          </Option>
          <Option>
            <OptionHeading ref={tvRef}>TV Shows</OptionHeading>
            <DropMenu>
              <DropLi><DropLink href="#" title='popular' onClick={showsQuery}>Popular</DropLink></DropLi>
              <DropLi><DropLink href="#" title='top rated' onClick={showsQuery}>Top Rated</DropLink></DropLi>
            </DropMenu>
          </Option>
        </Options>
      </Container>
    </Nav>
  )

}

export default Navbar;


const Nav = styled(motion.nav)`
  max-width: 100%;
  background: var(--accent-color);
`

const Container = styled(motion.div)`
  width: 90% ;
  margin: auto;
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 450px){
    flex-direction: row;
    justify-content: space-between;
  }
`

const Logo = styled(motion.h1)`
  font-family: var(--font-logo);
  font-size: 1.7rem;
  padding: 0.5rem;
  cursor: pointer;

  @media screen and (min-width: 450px){
    padding: 0;
  }
`

const Options = styled(motion.div)`
  display: flex;
  align-items: center;
`

const Option = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 1rem 0rem;
  min-width: 7rem;

  &:last-of-type {
    margin-right: 0;
  }

  &:hover > ul {
    visibility: visible;
    opacity: 1;
    transform: translateY(0%);
  }
`

const OptionHeading = styled(motion.h3)`
  font-weight: 400;
  pointer-events: none;
  transition: color 0.3s ease;
`

const DropMenu = styled(motion.ul)`
  position: absolute;
  width: 120% ;
  top: 3.5rem;
  left: -10%;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-radius: 0.5rem;
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
  will-change: transform;
  visibility: hidden;
  opacity: 0;
  transform: translateY(70%);
  transition: transform 0.7s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.6s cubic-bezier(0.33, 1, 0.68, 1);
  z-index: 3;
`

const DropLi = styled(motion.li)`
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`

const DropLink = styled(motion.a)`
  background: none;
  border: none;
  color: inherit;
  font-size: 1rem;
  font-family: inherit;
  font-weight: 300;
  transition: color 0.4s ease;
  pointer-events: all;

  &:hover {
    color: var(--accent-color);
  }
`