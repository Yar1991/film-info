import styled from "styled-components/macro";
import { motion, useAnimation } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { setMovieDetails, fetchVideos, setChoiceId } from "./moviesReducer";
import { useEffect, useRef } from "react";
import { MdClear, MdBrokenImage } from 'react-icons/md';
import { BsArrowLeftShort } from 'react-icons/bs';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const MovieDetails = ()=> {

  const dispatch = useDispatch();
  const { movieDetails, detailsTarget, videos, choiceId } = useSelector(state => state.movies);
  const controls = useAnimation();
  const closeBtnRef = useRef(null);
 


  const calcPopularity = (popularity)=> {
    if(popularity === 0){
      return '';
    }
    let popString = String(popularity);
    let newString = popString.split('').filter(val => val !== '.').join('').split('');
    let fullStar = Math.floor(Number(newString[0]) / 2);
    let halfStar = Math.floor(Number(newString[1]) / 2)
    let stars = [];
    for(let i = 1; i <= fullStar; i++){
      stars.push(FaStar);
    }
    halfStar < 5 ? stars.push(FaStarHalfAlt) : stars.push(FaStar);
    return stars;
  } 


  useEffect(()=> {
    if(choiceId){
      controls.start('to');
      let timeout = setTimeout(()=> {
        dispatch(fetchVideos({choiceId, detailsTarget}));
      }, 900);

      return ()=> window.clearTimeout(timeout);
    }
  }, [controls, dispatch, choiceId, detailsTarget]);


  const closeDetails = ()=> {
    controls.start('from');
    document.body.style.minHeight = '100vh';
    document.body.style.overflowY = 'scroll';
    dispatch(setChoiceId(null));
    setTimeout(()=> {
      dispatch(setMovieDetails({}));
    }, 300)
  }


  const animDetails = {
    from: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.3,
        ease: 'circIn',
      }
    },
    to: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'circOut',
        delay: 0.2
      }
    }
  }

  const animImg = {
    from: {
      opacity: 0,
      x: '-100%',
      transition: {
        duration: 1,
        ease: 'circIn',
      }
    },
    to: {
      opacity: 1,
      x: '0%',
      transition: {
        duration: 0.8,
        ease: 'circOut',
        delay: 0.2
      }
    }
  }

  const animInfo = {
    from: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 1,
        ease: 'circIn',
      }
    },
    to: {
      opacity: 1,
      x: '0%',
      transition: {
        duration: 0.8,
        ease: 'circOut',
        delay: 0.2
      }
    }
  }

  return (
    <>
      {movieDetails && <Details variants={animDetails} initial='from' animate={controls}>
        <Container >
          <CloseBtn ref={closeBtnRef} title='close' onClick={closeDetails}><CloseIcon as={MdClear}/></CloseBtn>
          <DetailsInfo>
            <ImgBox variants={animImg} initial='from' animate={controls}>
              {
                movieDetails.poster_path ? <Img src={`https://image.tmdb.org/t/p/w1280/${movieDetails.poster_path}`} alt={movieDetails?.title || movieDetails?.name} /> : <BrokenImg as={MdBrokenImage}/>
              }
            </ImgBox>
            <InfoBox variants={animInfo} initial='from' animate={controls}>
              <InfoTitle>{movieDetails?.title || movieDetails?.name}</InfoTitle>
              {movieDetails.release_date || movieDetails.first_air_date ? <InfoDate>Released: <BoldSpan>{movieDetails?.release_date || movieDetails?.first_air_date}</BoldSpan></InfoDate> : ''}
              <InfoGenres>Genres: <BoldSpan>{movieDetails?.genres && movieDetails?.genres.map((genre)=> {
                return genre !== movieDetails.genres[movieDetails.genres.length - 1] ? genre.name + ', ' : genre.name;
              })}</BoldSpan></InfoGenres>
              {movieDetails.runtime && movieDetails.runtime > 0 ? <InfoTime>Length: <BoldSpan>{movieDetails.runtime + ' min'}</BoldSpan></InfoTime> : ''}
              {calcPopularity(movieDetails?.vote_average) && <InfoRatingNum>Rating: <BoldSpan>{calcPopularity(movieDetails?.vote_average).map((item, index)=>{
                return <Star key={index} as={item}/>
              })}</BoldSpan></InfoRatingNum>}
              {movieDetails.homepage && <Homepage href={movieDetails.homepage} target='_blank' rel='noreferrer' title={movieDetails.title}>Webpage <BsArrowLeftShort/></Homepage>}
            </InfoBox>
          </DetailsInfo>
          <OverviewBox>{movieDetails.overview && movieDetails.overview}</OverviewBox>
          {movieDetails.backdrop_path && <BackdropImgBox>
            <BackdropImg src={`https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path}`} alt={movieDetails.title}/>
          </BackdropImgBox>}
          <Videos>
            {videos  && videos.length > 0 ? videos.map((video, index)=> {
              return (
                <Video key={index} src={`https://www.youtube.com/embed/${video.key}`} title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></Video>
              )
            }) : ''}
          </Videos>
        </Container>
      </Details>}
    </>
  )

}


export default MovieDetails;



const Details = styled(motion.div)`
  position: fixed;
  width: 95vw;
  height: 80vh;
  inset: 0;
  margin: auto;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0 20px rgba(0,0,0,0.4);
  overflow-y: scroll;
  overflow-x: hidden;
  transform-origin: center;
  z-index: 10;

  &::-webkit-scrollbar {
    width: 0.5rem;
    background: #f3f3f3;
    border-radius: 0 0.5rem 0.5rem 0;
  }

  &::-webkit-scrollbar-thumb {
    background: hsl(203, 58.8785046728972%, 41.96078431372548%);
  }

  @media screen and (min-width: 1024px){
    width: 80vw;
  }
`

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: relative;
`

const CloseBtn = styled(motion.button)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 2.2rem;
  color: var(--accent-color);
  cursor: pointer;
  background: none;
  border: none;
  transition: transform 0.4s ease;
  z-index: 10;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }
`

const CloseIcon = styled(motion.svg)`
  pointer-events: none;
  will-change: transform;
`

const DetailsInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 3.5rem 1rem;
  margin-top: 0.5rem;

  @media screen and (min-width: 1024px){
    flex-direction: row;
    padding: 3.5rem 2rem;
  }
`

const ImgBox = styled(motion.div)`
  height: 30rem;
  width: 100%;
  overflow: hidden;
  border-radius: 0.5rem;
  position: relative;
  will-change: transform;

  @media screen and (min-width: 1024px){
    flex: 2;
  }
`

const Img = styled(motion.img)`
  width: 100%;
  height: 100% ;
  object-fit: cover;
  object-position: center top;
`

const BrokenImg = styled(motion.svg)`
  font-size: 8rem;
  color: var(--accent-color);
  align-self: center;
  justify-self: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const InfoBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  justify-content: center;
  will-change: transform;
  gap: 1rem;
  
  @media screen and (min-width: 1024px){
    flex: 1;
    padding: 2rem;
    margin-left: 2rem;
  }
`

const InfoTitle = styled(motion.h2)`
  color: var(--accent-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 500;

  @media screen and (min-width: 1024px){
    font-size: 2.2rem;
  }
`

const InfoDate = styled(motion.h4)`
  color: #474747;
  font-weight: 500;
  font-size: 1.05rem;
`

const InfoGenres = styled(motion.p)`
  color: #474747;
  font-weight: 500;
  font-size: 1.05rem;
`

const InfoTime = styled(motion.p)`
  color: #474747;
  font-weight: 500;
  font-size: 1.05rem;
`

const InfoRatingNum = styled(motion.p)`
  color: #474747;
  font-weight: 500;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
`

const BoldSpan = styled(motion.span)`
  color: var(--accent-color);
  margin-left: 0.5rem;
`

const Star = styled(motion.svg)`
  font-size: 1.5rem;
  &:not(:last-of-type){
    margin-right: 0.2rem;
  }
`

const OverviewBox = styled(motion.div)`
  font-size: 1.05rem;
  color: #474747;
  padding: 1rem;
  margin-bottom: 1rem;
  
  @media screen and (min-width: 1024px){
    padding: 2rem;
    margin-top: 1rem;
  }
`

const BackdropImgBox = styled(motion.div)`
  height: 20rem;
  width: 100%;
  overflow: hidden;
  margin-top: 2rem;

  @media screen and (min-width: 1024px){
    height: 35rem;
    width: 95% ;
    margin: auto;
  }
`

const BackdropImg = styled(motion.img)`
  width: 100%;
  height: 100% ;
  object-fit: cover;
  object-position: center center;
`

const Homepage = styled(motion.a)`
  display: flex;
  align-items: center;
  color: var(--accent-color);
  font-size: 1.08rem;
  transition: opacity 0.4s ease;

  svg {
    font-size: 2rem;
    transition: transform 0.4s ease;
    margin-left: 0.4rem;
  }

  &:hover {
    opacity: 0.8;
  }

  &:hover svg {
    transform: translateX(-0.3rem);
  }
`

const Videos = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  position: relative;
`

const Video = styled(motion.iframe)`
  width: 100% ;
  height: 20rem;
  border: none;
  margin-bottom: 1rem;

  @media screen and (min-width: 1024px){
    height: 35rem;
    width: 95%;
    object-fit: cover;
    margin: auto;
    margin-bottom: 1.5rem;
  }
`

