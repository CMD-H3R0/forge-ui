// src/App.tsx
import "./app.css";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import SparksWidget from "./components/SparksWidget";

export default function App() {
  const handleCreateClick = useCallback(() => {
    const el = document.getElementById("sparks-demo");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // give the DOM a tick to scroll, then focus the title input if present
      setTimeout(() => {
        const title = document.getElementById("spark-title") as HTMLInputElement | null;
        title?.focus();
      }, 400);
    }
  }, []);

  return (
    <main className="container" role="main">
      {/* Logo */}
      <img src="/HD_N3RVV.png" alt="N3RVV Logo" className="logo" />

      {/* Headline */}
      <header>
        <h1 className="headline">
          <span className="text-warm">Capture sparks.</span>
          <br />
          Grow a <span className="text-cool">Concept Forest.</span>
        </h1>
        <p className="lede">
          A fast, cross-platform way to log ideas (text &amp; voice), score signal,
          and watch clusters form.
        </p>
      </header>

      {/* Buttons */}
      <nav aria-label="Primary">
        <div className="buttons">
          {/* Scroll the page to the embedded widget */}
          <button type="button" className="button create" onClick={handleCreateClick}>
            Create Spark
          </button>

          {/* Go to the full page version */}
          <Link className="button view" to="/sparks" aria-label="View existing Sparks">
            View Sparks
          </Link>
        </div>
        <small className="cta-hint">No account required for the demo.</small>
      </nav>

      {/* Stack */}
      <footer className="stack" aria-label="Tech stack">
        ⚙ AWS Amplify • API Gateway • Lambda • DynamoDB • S3 • Transcribe
      </footer>

      {/* Embedded widget at the bottom */}
      <section id="sparks-demo" style={{ maxWidth: 960, margin: "32px auto" }}>
        <SparksWidget user="anon" title="Quick Spark (Demo)" />
      </section>
    </main>
  );
}
