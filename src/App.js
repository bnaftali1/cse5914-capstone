import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";

import Search from "./search";
function App() {
  const [results, setResults] = useState([]);
  return (
    <>
      <div className="App">
        <div className="Wrapper">
          <Search results={results} setResults={setResults} />
        </div>
      </div>
    </>
  );
}

export default App;
