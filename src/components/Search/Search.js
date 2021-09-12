import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchMulti, setQueryType, setQuery, setPageIndex } from "../Movies/moviesReducer";


const Search = ()=> {

  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSumbit = (e)=> {
    e.preventDefault();
    dispatch(searchMulti([input, 1]));
    dispatch(setPageIndex(1));
    dispatch(setQueryType('search'));
    dispatch(setQuery(input));
    setInput('')
  }

  const animSearch = {
    from: {
      opacity: 0,
      y: '200%',
    },
    to: {
      opacity: 1,
      y: '0%',
      transition: {
        ease: 'circOut',
        duration: 1,
        delay: 0.3
      }
    }
  }


  return (
    <Container variants={animSearch} initial='from' animate='to'>
      <Form action="#" onSubmit={handleSumbit}>
        <SearchInput type="text" onChange={(e)=> setInput(e.target.value)} name="query" id="query" value={input} required/>
        <SearchButton type="submit" title='search'>Search</SearchButton>
      </Form>
    </Container>
  )

}


export default Search;


const Container = styled(motion.div)`
  width: 90% ;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding-top: 3rem;
`

const Form = styled(motion.form)`
  width: 100% ;
  display: flex; 
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 1024px){
    width: 50% ;
    margin: auto;
    margin: 2.5rem 0;
  }
`

const SearchInput = styled(motion.input)`
  width: 100% ;
  padding: 0.3rem;
  min-height: 1rem;
  border: none;
  background: #fff;
  border-radius: 0.5rem 0 0 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  filter: drop-shadow(0 0 10px rgba(0,0,0,0.2));

  &:focus {
    outline-offset: 0.2rem;
    outline-style: dashed;
    outline-width: 1px;
    outline-color: rgba(145, 194, 240, 0.7);
  }
`

const SearchButton = styled(motion.button)`
  background: var(--accent-color);
  color: #fff;
  border-radius: 0 0.5rem 0.5rem 0;
  border: none;
  padding: 0.3rem 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 300;
  filter: drop-shadow(2px 2px 10px rgba(0,0,0,0.3));
  transition: opacity 0.4s ease;

  &:hover {
    opacity: 0.8;
  }
`