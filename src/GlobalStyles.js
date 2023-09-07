import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        height: 100%;
        margin: 0;
        padding: 0;
        background: linear-gradient(
        rgb(54, 54, 82),
        15%,
        rgb(84, 106, 144),
        60%,
        rgb(68, 111, 151)
    );

    #root {
        height: 100vh;
    }

    }

    .App {
        height: 90vh;
        width: 100vw;
    }
`;

export default GlobalStyles;