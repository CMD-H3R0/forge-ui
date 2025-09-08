// src/App.tsx
import "./app.css";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import SparksWidget from "./components/SparksWidget";

export default function App() {
  // Scroll to the embedded widget and focus the title box
  const handleCreateClick = useCallback(() => {
    const target = document.getElementById("sparks-demo");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
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
          {/* Scroll to embedded widget */}
          <button type="button" className="button create" onClick={handleCreateClick}>
            Create Spark
          </button>

          {/* Full page */}
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

      {/* Full-bleed dark band with embedded widget */}
      <div className="full-bleed">
        {/* Local normalize + tiny-input styles scoped to this section only */}
        <style>{`
          /* scope everything to #sparks-demo so landing styles stay pristine */
          #sparks-demo *, #sparks-demo *::before, #sparks-demo *::after { box-sizing: border-box; }
          #sparks-demo h2 { margin: 0 0 8px 0; line-height: 1.25; }
          #sparks-demo input, #sparks-demo textarea {
            width: 100%;
            font-size: 14px;          /* tiny */
            line-height: 1.25;
            padding: 8px 10px;        /* tiny */
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.12);
            background: rgba(255,255,255,0.06);
            color: #e8e9ea;
            outline: none;
          }
          #sparks-demo textarea { resize: vertical; min-height: 96px; }
          #sparks-demo .button.create { margin-top: 8px; } /* breathe */
        `}</style>

        <section id="sparks-demo" style={{ maxWidth: 960, margin: "0 auto", padding: "0 16px" }}>
          <SparksWidget user="anon" title="Quick Spark (Demo)" />
        </section>
      </div>
    </main>
  );
}
