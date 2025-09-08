import "./app.css";
import { Link } from "react-router-dom";
import SparksWidget from "./components/SparksWidget";

export default function App(){
  return (
    <main className="container" role="main">
      <img src="/HD_N3RVV.png" alt="N3RVV Logo" className="logo" />
      <header>
        <h1 className="headline">
          <span className="text-warm">Capture sparks.</span><br/>
          Grow a <span className="text-cool">Concept Forest.</span>
        </h1>
        <p className="lede">A fast, cross-platform way to log ideas (text &amp; voice), score signal, and watch clusters form.</p>
      </header>
      <nav aria-label="Primary">
        <div className="buttons">
          <a href="#demo" className="button create">Create Spark</a>
          <Link className="button view" to="/sparks">View Sparks</Link>
        </div>
        <small className="cta-hint">No account required for the demo.</small>
      </nav>
      <footer className="stack" aria-label="Tech stack">⚙ AWS Amplify • API Gateway • Lambda • DynamoDB • S3 • Transcribe</footer>

       <footer className="stack" aria-label="Tech stack">
        ⚙ AWS Amplify • API Gateway • Lambda • DynamoDB • S3 • Transcribe
      </footer>

      {/* Centered demo section without the full-bleed offset hack */}
      <style>{`
        :root { color-scheme: dark; }
        html, body, #root { background:#0e0f12; min-height:100%; }
        body { margin:0; }
        .demo-band {
          width:100%;
          background:#0e0f12;
          border-top:1px solid rgba(255,255,255,0.06);
          padding:32px 0 80px;
        }
        #demo * { box-sizing:border-box; }
        #demo input, #demo textarea {
          width:100%;
          font-size:14px; line-height:1.25;
          padding:8px 10px; border-radius:10px;
          border:1px solid rgba(255,255,255,0.12);
          background:rgba(255,255,255,0.06); color:#e8e9ea; outline:none;
        }
        #demo textarea { resize:vertical; min-height:96px; }
      `}</style>

      <div className="demo-band">
        <section
          id="demo"
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "0 16px",
            display: "grid",
            placeItems: "center"
          }}
        >
          <div style={{ width: "100%", maxWidth: 880 }}>
            <SparksWidget user="anon" title="Quick Spark (Demo)" />
          </div>
        </section>
      </div>
    </main>
  );
}
