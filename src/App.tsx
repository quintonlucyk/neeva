import React from "react";
import styled from "styled-components";

import Search from "./pages/Search";

function App() {
  const StyledApp = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5em;
  `;
  return (
    <StyledApp>
      <Search />
    </StyledApp>
  );
}

export default App;
