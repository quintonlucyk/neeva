import React from "react";
import styled from "styled-components";

import Search from "./pages/Search";

function App() {
  const StyledApp = styled.div`
    margin: 5em auto;
    width: 20em;
  `;
  return (
    <StyledApp>
      <Search />
    </StyledApp>
  );
}

export default App;
