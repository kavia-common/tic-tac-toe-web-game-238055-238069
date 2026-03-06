import React from "react";
import Button from "./Button";

// PUBLIC_INTERFACE
export default function ButtonExamples() {
  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", background: "#f9fafb", padding: "1rem" }}>
      <Button variant="primary" onClick={() => alert("Primary clicked!")}>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="error">Error</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </div>
  );
}
