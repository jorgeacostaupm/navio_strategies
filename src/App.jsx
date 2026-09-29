import { useState } from "react";
import CsvLoader from "./CsvLoader.jsx";
import NavioExample from "./NavioExample.jsx";

export default function App() {
  const [data, setData] = useState([]);

  return (
    <main>
      <h1>Navio playground</h1>
      <p>
        Test different strategies for row selection when the available space is
        insufficient to show all the data.
      </p>
      <NavioExample data={data} />
      <CsvLoader onData={setData} recordCount={data.length} />
    </main>
  );
}
