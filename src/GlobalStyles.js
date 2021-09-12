import { createGlobalStyle } from 'styled-components';


const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  } 

  *::-webkit-scrollbar {
    width: 0.5rem;
    background: #f3f3f3;
  }

  *::-webkit-scrollbar-thumb {
    background: hsl(203, 58.8785046728972%, 41.96078431372548%);
  }


  html {
    --font-logo: 'Poller One', cursive;
    --font-logo-two: 'Fredericka the Great', cursive;
    --font-main: 'Poppins', sans-serif;
    --accent-color: hsl(203, 58.8785046728972%, 41.96078431372548%);
    --bg-color: #f3f3f3; 
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-main);
    background: var(--bg-color);
    color: #242424;
    min-height: 100vh;
    width: 100%;
  }

  a:focus, button:focus {
    outline-offset: 0.2rem;
    outline-style: dashed;
    outline-width: 1px;
    outline-color: rgba(250,250,250, 0.5);
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  ul {
    list-style: none;
  }
`

export default GlobalStyles;