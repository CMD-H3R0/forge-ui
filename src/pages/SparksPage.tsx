import SparksWidget from "../components/SparksWidget";

export default function SparksPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0e0f12",
        color: "#e8e9ea",
        padding: "48px 16px",
        display: "flex",
        justifyContent: "center",   // centers horizontally
        alignItems: "flex-start",   // keep at top, not full vertical center
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 720,             // keeps it a nice column
        }}
      >
        <SparksWidget user="anon" title="Forge Sparks" />
      </div>
    </div>
  );
}
