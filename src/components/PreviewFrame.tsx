import { useEffect, useRef } from "react";
// NOTE: kaplay's package.json "exports" map only exposes "." and "./global" -
// "./dist/kaplay.js" is not an exported subpath, so the bare specifier
// `kaplay/dist/kaplay.js?raw` is rejected by Vite/Rolldown's exports-map
// resolution (verified directly: a build with the bare specifier fails with
// `"./dist/kaplay.js" is not exported ... from package .../kaplay`). A
// relative filesystem path into node_modules bypasses that map and reads the
// UMD/global build directly - it attaches `window.kaplay` (and the alias
// `window.kaboom`), confirmed by inspecting the tail of that file.
import kaplayScriptSrc from "../../node_modules/kaplay/dist/kaplay.js?raw";

function buildSrcdoc(userCode: string): string {
  const safeUserCode = JSON.stringify(userCode).replace(/<\/script/gi, "<\\/script");
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>html,body{margin:0;padding:0;overflow:hidden;background:#111}</style></head>
<body>
<script>${kaplayScriptSrc}</script>
<script>
  window.onerror = function (message, source, lineno, colno, error) {
    window.parent.postMessage({ type: 'kaplay-error', message: String(message), stack: error && error.stack ? error.stack : null, lineno, colno }, '*');
    return true;
  };
  window.addEventListener('unhandledrejection', function (event) {
    var reason = event.reason;
    window.parent.postMessage({ type: 'kaplay-error', message: 'Unhandled promise rejection: ' + (reason && reason.message ? reason.message : String(reason)), stack: reason && reason.stack ? reason.stack : null }, '*');
  });
  var USER_CODE = ${safeUserCode};
  try {
    new Function(USER_CODE)();
  } catch (err) {
    window.parent.postMessage({ type: 'kaplay-error', message: err && err.message ? err.message : String(err), stack: err && err.stack ? err.stack : null }, '*');
  }
</script>
</body>
</html>`;
}

export type PreviewErrorInfo = {
  message: string;
  stack: string | null;
};

type PreviewFrameProps = {
  code: string;
  runToken: number;
  onError: (error: PreviewErrorInfo) => void;
};

export function PreviewFrame({ code, runToken, onError }: PreviewFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // Keep the latest onError without re-subscribing the listener on every render.
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      // Filter by source, not origin: a sandboxed iframe without
      // allow-same-origin has an opaque origin, so event.origin is always the
      // literal string "null" and can't be used to identify the sender.
      if (event.source !== iframeRef.current?.contentWindow) return;
      const data = event.data;
      if (data && typeof data === "object" && data.type === "kaplay-error") {
        const message = typeof data.message === "string" ? data.message : String(data.message);
        const stack = typeof data.stack === "string" ? data.stack : null;
        console.error("KAPLAY preview error:", message, stack ?? "");
        onErrorRef.current({ message, stack });
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <iframe
      key={runToken}
      ref={iframeRef}
      className="preview-frame"
      sandbox="allow-scripts"
      srcDoc={buildSrcdoc(code)}
      title="Game preview"
    />
  );
}
