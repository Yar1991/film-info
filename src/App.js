import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import Movies from "./components/Movies/Movies";
import Footer from "./components/Footer/Footer";
import MovieDetails from "./components/Movies/MovieDetails";
import { useEffect } from 'react';

function App() {

  useEffect(()=>{
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
     })
  },[]);

  return (
    <>
      <MovieDetails/>
      <Navbar/>
      <Search/>
      <Movies/>
      <Footer/>
    </>
  );
}

export default App;

