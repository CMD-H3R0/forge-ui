import './app.css';

function App() {
  return (
    <div className="container">
      {/* Logo */}
      <img src="/HD_N3RVV.png" alt="N3RVV Logo" className="logo" />

      {/* Headline */}
      <h1>
        <span>Capture sparks.</span>
        <br />
        Grow a <span>Concept Forest.</span>
      </h1>
      <p>
        A fast, cross-platform way to log ideas (text &amp; voice), score signal,
        and watch clusters form.
      </p>

      {/* Buttons */}
      <div className="buttons">
        <a href="#" className="button create">Create Spark</a>
        <a href="#" className="button view">View Sparks</a>
      </div>

      {/* Stack */}
      <div className="stack">
        ⚙ AWS Amplify • API Gateway • Lambda • DynamoDB • S3 • Transcribe
      </div>
    </div>
  );
}

export default App;
