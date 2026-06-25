import "../style/home.scss"

const Home = () => {
  return (
    <main className="home">
      {/* Hero */}
      <div className="hero-text">
        <h1>Create Your Custom <em>Interview Plan</em></h1>
        <p>Let our AI analyze the job requirements and your unique profile to build a high-conversion<br />preparation strategy tailored for excellence.</p>
      </div>

      {/* Two-column form */}
      <div className="form-columns">

        {/* LEFT — Job Description */}
        <div className="col col-left">
          <div className="col-header">
            <span className="step-badge">1</span>
            <span className="col-icon">📋</span>
            <span className="col-title">Target Job Description</span>
            <span className="badge-required">REQUIRED</span>
          </div>
          <div className="card card-left">
            <p className="card-label">JOB CONTEXT &amp; REQUIREMENTS</p>
            <textarea
              placeholder="Paste the full job description here… e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design….'"
            />
            <div className="card-footer">
              <span className="ai-dot">AI is ready to analyze</span>
              <span className="char-count">0 / 5000 characters</span>
            </div>
          </div>
        </div>

        {/* RIGHT — Professional Profile */}
        <div className="col col-right">
          <div className="col-header">
            <span className="step-badge">2</span>
            <span className="col-icon">👤</span>
            <span className="col-title">Your Professional Profile</span>
          </div>
          <div className="card card-right">
            <div className="upload-section">
              <div className="upload-row-title">
                <span>Upload Resume</span>
                <span className="badge-best">BEST RESULTS</span>
              </div>
              <label className="drop-zone" htmlFor="resume">
                <span className="upload-icon">⬆️</span>
                <span className="drop-main">Click to upload or drag &amp; drop</span>
                <span className="drop-sub">PDF, DOCX, or TXT (Max 10MB)</span>
              </label>
              <input hidden type="file" id="resume" name="resume" accept=".pdf,.docx,.txt" />
            </div>

            <div className="or-divider"><span>OR</span></div>

            <div className="self-desc-section">
              <p className="section-label">Quick Self-Description</p>
              <textarea
                className="self-desc-textarea"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy…"
              />
            </div>

            <div className="info-box">
              <span className="info-icon">ℹ️</span>
              <span>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bottom-bar">
        <div className="bottom-left">
          <span className="sparkle">✦</span> AI-Powered Strategy Generation
          <span className="dot-sep">•</span>
          Processing time: ~45 seconds
        </div>
        <button className="generate-btn">⚡ Generate My Interview Strategy</button>
      </div>
    </main>
  )
}

export default Home