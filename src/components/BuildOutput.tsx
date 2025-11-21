"use client";

export default function BuildOutput({ result }) {
  return (
    <div className="output-container">
      <h2>Blueprint Ready</h2>
      <pre className="output-block">{JSON.stringify(result, null, 2)}</pre>

      {result.zipUrl && (
        <a className="zip-download" href={result.zipUrl} download>
          Download ZIP
        </a>
      )}
    </div>
  );
}
