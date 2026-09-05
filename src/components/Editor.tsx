import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const extensions = [javascript()];

export function Editor({ value, onChange }: EditorProps) {
  return (
    <CodeMirror
      value={value}
      height="100%"
      theme="dark"
      extensions={extensions}
      onChange={onChange}
      basicSetup={{ lineNumbers: true, foldGutter: true }}
    />
  );
}
