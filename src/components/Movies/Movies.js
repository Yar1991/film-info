import styled from "styled-components/macro";
import { motion } from "framer-motion";
import { fetchMovies, searchMulti, fetchMovieDetails, increasePageIndex, decreasePageIndex, setChoiceId } from "./moviesReducer";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import Spinner from "./loadingSpinner";
import { MdChevronLeft, MdChevronRight, MdBrokenImage } from 'react-icons/md';

const Movies = ()=> {
  
  const dispatch = useDispatch();
  const { movieList, status, pageIndex, totalPages, queryType, query, choiceId, movieDetails } = useSelector(state => state.movies);

  
  useEffect(()=>{
    switch(queryType){
      case 'search':
        dispatch(searchMulti([query, pageIndex]));
        break;
      case 'movie/popular':
        dispatch(fetchMovies([pageIndex, 'popular', 'movie']));
        break;
      case 'movie/top_rated':
        dispatch(fetchMovies([pageIndex, 'top_rated', 'movie']));
        break;
      case 'movie/upcoming':
        dispatch(fetchMovies([pageIndex, 'upcoming', 'movie']));
        break;
      case 'tv/popular':
        dispatch(fetchMovies([pageIndex, 'popular', 'tv']));
        break;
      case 'tv/top_rated':
        dispatch(fetchMovies([pageIndex, 'top_rated', 'tv']));
        break;
      default:
        dispatch(fetchMovies([pageIndex, 'now_playing', 'movie']));
        break;
    }
  }, [dispatch, queryType, pageIndex, query]);

  const nextPage = ()=>{
    if(pageIndex >= totalPages){
      return;
    }
    dispatch(increasePageIndex());
  }

  const previousPage = ()=>{
    if(pageIndex <= 1){
      return;
    }
    dispatch(decreasePageIndex());
  }

  const openMovieDetails = (id)=>{
    let name = findMovie(id);
    document.body.style.height = '100vh';
    document.body.style.overflowY = 'hidden';
    dispatch(setChoiceId(id));
    dispatch(fetchMovieDetails([id, name]));
  }

  const findMovie = (id)=> {
    let target = movieList.find(movie=> movie.id === id);
    let targetName = target.title || target.name;
    return targetName;
  }


  const animGrid = {
    from: {
      opacity: 0,
    },
    to: {
      opacity:1,
      transition: {
        ease: 'circOut',
        duration: 1,
        delay: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const animItem = {
    from: {
      opacity: 0,
      y: '100%',
    },
    to: {
      opacity: 1,
      y: '0%',
      transition: {
        ease: 'circOut',
        duration: 0.8,
      }
    }
  }



  return ( 
    <Container movieDetails={movieDetails}>
      {status === 'loading' && !choiceId ? <Spinner/> : (
        <Grid movieDetails={movieDetails} variants={animGrid} initial='from' animate='to'>
          {movieList.map((movie)=> {
            return (
              <ItemWrapper key={movie?.id} variants={animItem}>
                <Item onClick={()=> openMovieDetails(movie?.id)}>
                  <InfoBox>
                    <InfoTitle title={movie?.title || movie?.name}>{movie?.title || movie?.name}</InfoTitle>
                    <InfoDate>{movie?.release_date}</InfoDate>
                  </InfoBox>
                  <ImgBox>
                    {movie.poster_path ? <Img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="poster" /> : <BrokenImg as={MdBrokenImage}/>}
                  </ImgBox>
                </Item>
              </ItemWrapper>
            )
          })}
        </Grid>
      )}
      {status === 'success' ? <Pages>
          <LeftBtn title='previous' onClick={previousPage}><MdChevronLeft style={{ pointerEvents: 'none' }}/></LeftBtn><PageNumber>{pageIndex}</PageNumber><RightBtn title='next' onClick={nextPage}><MdChevronRight style={{ pointerEvents: 'none' }}/></RightBtn>
      </Pages> : ''}
    </Container>
  )

}


export default Movies;

const Container = styled(motion.div)`
  width: 95% ;
  margin: auto;
  padding-top: 3rem;
  padding-bottom: 3rem;
  position: relative;
  transition: filter 0.2s ease;
  filter: ${({movieDetails})=> movieDetails && movieDetails?.id ? 'blur(4px)' : 'blur(0px)'};
`

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  place-content: center;
  gap: 2rem 1rem;
  pointer-events: ${({movieDetails})=> movieDetails && movieDetails?.id ? 'none' : 'all'};

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(20rem, 25rem));
    gap: 2rem 1.5rem;
  }
`

const ItemWrapper = styled(motion.div)`
  padding: 0;
`

const Item = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50vh ;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0 15px rgba(0,0,0,0.3);
  overflow: hidden;
  cursor: pointer;
  will-change: transform;
  transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);

  @media screen and (min-width: 1024px) {
    height: 25rem;

    &:hover {
      transform: scale(1.03);
    }
  }
`

const InfoBox = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1rem;
`

const InfoTitle = styled(motion.h3)`
  font-weight: 500;
  font-size: 1rem;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const InfoDate = styled(motion.h4)`
  font-weight: 400;
  font-size: 0.9rem;
  opacity: 0.8;
  flex: 1;
  text-align: right;
`

const ImgBox = styled(motion.div)`
  position: relative;
  width: 100% ;
  height: 100% ;
  overflow: hidden;
  will-change: transform;
`

const Img = styled(motion.img)`
  width: 100% ;
  height: 100% ;
  object-fit: cover;
  object-position: center top;
  will-change: transform;
  transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);

  @media screen and (min-width: 1024px) {
    &:hover {
      transform: translateY(1rem) scale(1.05);
    }
  }
`

const BrokenImg = styled(motion.svg)`
  font-size: 8rem;
  color: var(--accent-color);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Pages = styled(motion.div)`
  width: 50vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: auto;
  margin-top: 5rem;
  margin-bottom: 3rem;

  @media screen and (min-width: 1024px){
    width: 15vw;
  }
`

const LeftBtn = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2.5rem;
  color: #333;

  svg {
    transition: transform 0.4s ease;
    will-change: transform;
  }

  &:hover > svg {
    transform: scale(1.2);
  }

  &:active > svg {
    transform: scale(1);
  }

  @media screen and (min-width: 1024px){
    font-size: 2rem;
  }
`

const RightBtn = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2.5rem;
  color: #333;

  svg {
    transition: transform 0.4s ease;
    will-change: transform;
  }

  &:hover > svg {
    transform: scale(1.2);
  }

  &:active > svg {
    transform: scale(1);
  }

  @media screen and (min-width: 1024px){
    font-size: 2rem;
  }
`

const PageNumber = styled(motion.h4)`
  font-weight: 400;
  color: var(--accent-color);
  font-size: 1.5rem;

  @media screen and (min-width: 1024px){
    font-size: 1.6rem;
  }
`