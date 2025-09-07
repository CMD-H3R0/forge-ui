import { useNavigate } from "react-router-dom"; // if you add routing later
import "./landing.css";

export default function App() {
  const navigate = (path: string) => () => {
    // If you don’t have routing yet, wire these to onClick handlers in the page.
    console.log("TODO: go to", path);
  };

  return (
    <main className="landing">
      {/* floating background blobs */}
      <div className="blob blob-a" />
      <div className="blob blob-b" />

      <header className="nav">
        <div className="brand">
          <span className="logo">⚡</span>
          <span>N3RVV Forge</span>
        </div>
        <div className="links">
          <a href="#" onClick={navigate("/sparks")}>Sparks</a>
          <a href="#" onClick={navigate("/about")}>About</a>
          <a href="https://github.com/CMD-H3R0/forge-ui" target="_blank">GitHub</a>
        </div>
      </header>

      <section className="hero">
        <h1><span className="accent">Capture</span> sparks. <br/>Grow a <span className="accent">Concept Forest</span>.</h1>
        <p className="tagline">
          A fast, cross-platform way to log ideas (text & voice), score signal, and watch clusters form.
        </p>

        <div className="cta">
          <button className="btn primary" onClick={navigate("/create")}>Create Spark</button>
          <button className="btn ghost" onClick={navigate("/sparks")}>View Sparks</button>
        </div>

        <div className="notes">
          <span>⚙️ AWS Amplify • API Gateway • Lambda • DynamoDB • S3 • Transcribe</span>
        </div>
      </section>
    </main>
  );
}
