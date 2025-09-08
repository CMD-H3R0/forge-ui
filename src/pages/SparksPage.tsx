import SparksWidget from "../components/SparksWidget";

export default function SparksPage() {
  // Optional route that shows just the widget (kept centered)
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0e0f12",
        color: "#e8e9ea",
        margin: 0,
        padding: "48px 16px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SparksWidget user="anon" title="Forge Sparks" />
    </div>
  );
}
