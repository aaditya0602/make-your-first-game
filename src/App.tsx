import { useEffect, useState } from "react";
import "./App.css";
import { Editor } from "./components/Editor";
import { PreviewFrame, type PreviewErrorInfo } from "./components/PreviewFrame";
import { steps } from "./steps";

function storageKey(stepId: number): string {
  return `teaching-tool:step:${stepId}:code`;
}

function loadCodeForStep(stepId: number, starterCode: string): string {
  try {
    return localStorage.getItem(storageKey(stepId)) ?? starterCode;
  } catch {
    return starterCode;
  }
}

function saveCodeForStep(stepId: number, code: string): void {
  try {
    localStorage.setItem(storageKey(stepId), code);
  } catch {
    // localStorage may be unavailable (private browsing, quota, etc.) - not fatal.
  }
}

// Renders instruction text with blank-line-separated paragraphs, "- " bullet
// lists, and `backtick` inline code - no markdown library needed for this.
function InstructionsBody({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/);
  return (
    <>
      {blocks.map((block, blockIndex) => {
        const lines = block.split("\n").filter((line) => line.length > 0);
        const isList = lines.length > 0 && lines.every((line) => /^\s*- /.test(line));
        const renderInline = (line: string, key: string) =>
          line.split(/(`[^`]+`)/g).map((part, i) =>
            part.startsWith("`") && part.endsWith("`") ? (
              <code key={`${key}-${i}`}>{part.slice(1, -1)}</code>
            ) : (
              <span key={`${key}-${i}`}>{part}</span>
            ),
          );
        if (isList) {
          return (
            <ul key={blockIndex}>
              {lines.map((line, lineIndex) => (
                <li key={lineIndex}>{renderInline(line.replace(/^\s*- /, ""), `${blockIndex}-${lineIndex}`)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={blockIndex}>
            {lines.map((line, lineIndex) => (
              <span key={lineIndex}>
                {renderInline(line, `${blockIndex}-${lineIndex}`)}
                {lineIndex < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </>
  );
}

function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];

  const [code, setCode] = useState<string>(() => loadCodeForStep(step.id, step.starterCode));
  const [runToken, setRunToken] = useState(0);
  const [previewError, setPreviewError] = useState<PreviewErrorInfo | null>(null);
  // Bumped whenever the editor's text must be force-replaced from outside
  // (Reset, or navigating to a step) rather than by the learner's own typing.
  // Used as the Editor's React `key` so it fully remounts instead of relying
  // on CodeMirror's internal external-value reconciliation, which defers the
  // update while it thinks the user is still typing (see @uiw/react-codemirror's
  // TimeoutLatch) - a remount can never be left stale like that.
  const [editorKey, setEditorKey] = useState(0);

  // Navigating to a step loads that step's saved code (or its starter code)
  // and auto-runs it once so the learner immediately sees where they left off.
  useEffect(() => {
    const nextStep = steps[stepIndex];
    setCode(loadCodeForStep(nextStep.id, nextStep.starterCode));
    setPreviewError(null);
    setRunToken((t) => t + 1);
    setEditorKey((k) => k + 1);
    // Only step navigation should trigger this - it reads `step` fresh via
    // `steps[stepIndex]` each time, so `step` itself isn't a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex]);

  function handleCodeChange(next: string) {
    setCode(next);
    saveCodeForStep(step.id, next);
  }

  function handleRun() {
    setPreviewError(null);
    setRunToken((t) => t + 1);
  }

  function handleReset() {
    setCode(step.starterCode);
    saveCodeForStep(step.id, step.starterCode);
    setPreviewError(null);
    setRunToken((t) => t + 1);
    setEditorKey((k) => k + 1);
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1 className="app-title">Game Dev Teaching Tool</h1>
        <nav className="step-nav">
          <button type="button" onClick={() => setStepIndex((i) => i - 1)} disabled={stepIndex === 0}>
            ← Prev
          </button>
          <span className="step-nav-title">
            Step {stepIndex + 1} of {steps.length}: {step.title}
          </span>
          <button
            type="button"
            onClick={() => setStepIndex((i) => i + 1)}
            disabled={stepIndex === steps.length - 1}
          >
            Next →
          </button>
        </nav>
        <div className="header-actions">
          <button type="button" className="primary-button" onClick={handleRun}>
            Run
          </button>
          <button type="button" className="secondary-button" onClick={handleReset}>
            Reset to working code
          </button>
        </div>
        {previewError && (
          <div className="error-banner">
            <span className="error-banner-text">
              Something didn't work — check your code against the instructions, or hit Reset to
              get back to a working version.
            </span>
            <details className="error-banner-details">
              <summary>Details</summary>
              <pre>{previewError.message}</pre>
            </details>
          </div>
        )}
      </header>
      <main className="app-main">
        <section className="panel-instructions">
          <h2>{step.title}</h2>
          <InstructionsBody text={step.instructions} />
        </section>
        <section className="panel-editor">
          <Editor key={editorKey} value={code} onChange={handleCodeChange} />
        </section>
        <section className="panel-preview">
          <PreviewFrame code={code} runToken={runToken} onError={setPreviewError} />
        </section>
      </main>
    </div>
  );
}

export default App;
