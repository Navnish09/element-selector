import { useState } from "react";
import { ElementSelector } from "./ElementSelector";
import "./styles.css";

export default function App() {
  const [enable, setEnable] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);
  const selectionHandler = (elements) => {
    console.log(elements);
  };

  return (
    <>
      <ElementSelector
        enable={enable}
        onSelection={selectionHandler}
        multiSelect={multiSelect}
      >
        <div className="App">
          <div style={{ padding: "10px" }}>
            <h1>Element Selectors</h1>
          </div>

          <div className="card">Card</div>

          <h2>Enable the selector and hover the elements to select.</h2>
        </div>
      </ElementSelector>

      <center>
        <button
          onClick={() => {
            setEnable((prev) => !prev);
          }}
          data-noselection={true}
        >
          {!enable ? "Enable Selector" : "Disable Selector"}
        </button>
      </center>
      <br />
      <center>
        <button
          onClick={() => {
            setMultiSelect((prev) => !prev);
          }}
          data-noselection={true}
        >
          {!multiSelect ? "Enable multi select" : "Disable multi select"}
        </button>
      </center>
    </>
  );
}
