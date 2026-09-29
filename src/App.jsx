import { useState } from "react";
import CsvLoader from "./CsvLoader.jsx";
import NavioExample from "./NavioExample.jsx";

export default function App() {
  const [data, setData] = useState([]);
  const [height, setHeight] = useState(500);

  return (
    <>
      <p>
        Test different strategies for row selection when the available space is
        insufficient to show all the data.
      </p>
      <p>Current Height: {height}px</p>
      <NavioExample data={data} height={height} />
      <CsvLoader
        onData={setData}
        recordCount={data.length}
        currentHeight={height}
      />
    </>
  );
}
