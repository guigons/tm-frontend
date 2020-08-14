import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #24292e;
    color: #FFF;
    font-family: 'Roboto Slab',  sans-serif;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
  }

  html, body, #root {
    height: 100%;
  }

  body, input, select, button {
    font-family: 'Roboto Slab',  sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

  :root {
    --color-background: #24292e;
    --color-box: #312e38;
    --color-primary: #19b2ff;
    --color-secondary: #f16262;
    --color-text: #FFFFFF;
    --color-text-secondary: grey;
  }

`;
