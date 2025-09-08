import "./app.css";
import SparksWidget from "./components/SparksWidget";

export default function App() {
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
          A fast, cross-platform way to log ideas (text &amp; voice), score
          signal, and watch clusters form.
        </p>
      </header>

      {/* Buttons */}
      <nav aria-label="Primary">
        <div className="buttons">
          <a href="#demo" className="button create" aria-label="Create a new Spark">
            Create Spark
          </a>
          <a href="#demo" className="button view" aria-label="View existing Sparks">
            View Sparks
          </a>
        </div>
        <small className="cta-hint">No account required for the demo.</small>
      </nav>

      {/* Stack */}
      <footer className="stack" aria-label="Tech stack">
        ⚙ AWS Amplify • API Gateway • Lambda • DynamoDB • S3 • Transcribe
      </footer>

      {/* Demo widget */}
      <section
        id="demo"
        style={{
          marginTop: "4rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <SparksWidget user="anon" title="Quick Spark (Demo)" />
      </section>
    </main>
  );
}
