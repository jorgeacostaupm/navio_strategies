import { useEffect, useRef, useState } from "react";
import { parseCsv } from "./csv.js";

export default function CsvLoader({ onData, recordCount }) {
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filename, setFilename] = useState("example.csv");

  useEffect(() => {
    const controller = new AbortController();
    async function loadExample() {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}examples/example.csv`,
          {
            signal: controller.signal,
          },
        );
        if (!response.ok)
          throw new Error(`Could not load the example (${response.status}).`);
        const rows = parseCsv(await response.text());
        if (!controller.signal.aborted) onData(rows);
      } catch (error) {
        if (!controller.signal.aborted) setError(error.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadExample();
    return () => controller.abort();
  }, [onData]);

  async function loadCsv(event) {
    const file = event.target.files[0];
    if (!file) return;
    event.target.value = "";
    setLoading(true);
    setError("");
    try {
      const rows = parseCsv(await file.text());
      onData(rows);
      setFilename(file.name);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not read the CSV file.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ margin: "24px 0" }}>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        hidden
        onChange={loadCsv}
        disabled={loading}
      />
      <button
        type="button"
        onClick={() => inputRef.current.click()}
        disabled={loading}
      >
        {loading ? "Loading…" : "Load CSV"}
      </button>
      <p>
        Expected format: comma-separated CSV with column names in the first row.
      </p>
      <p role="status">Currently loaded file: {filename}</p>
      <p>Contains: {recordCount} records</p>

      {error && <p role="alert">{error}</p>}
    </div>
  );
}
