import { Editor, useMonaco } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./theme-provider";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "@/utils/constants";

import { loader } from "@monaco-editor/react";

import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { ModeToggle } from "./mode-toggle";
import { Separator } from "./ui/separator";
import Output from "./Output";
export type Language = keyof typeof CODE_SNIPPETS;
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

loader.config({ monaco });

loader.init().then(/* ... */);

const CodeEditor = () => {
  const EditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const { theme } = useTheme();
  const [value, setValue] = useState<string | undefined>(
    CODE_SNIPPETS["javascript"]
  );
  const [language, setLanguage] = useState<Language>("javascript");

  const onMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    EditorRef.current = editor;
    editor.focus();
  };
  const monaco = useMonaco();

  useEffect(() => {
    // do conditional chaining
    monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    // or make sure that it exists by other ways
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
  }, [monaco]);
  const onSelect = (lang: Language) => {
    console.log("onSelect", lang);
    setLanguage(lang);

    setValue(CODE_SNIPPETS?.[lang]);
  };
  const ValueChanged = (value: string | undefined) => {
    if (value) {
      setValue(value);
    }
  };
  return (
    <div className="grid grid-cols-12 gap-4 w-full">
      <div className="col-span-12 lg:col-span-6 w-full">
        <div className="flex justify-between items-center">
          <LanguageSelector language={language} onSelect={onSelect} />
          <ModeToggle />
        </div>
        <Editor
          options={{
            minimap: {
              enabled: false,
            },
          }}
          height="80vh"
          theme={`vs-${theme}`}
          defaultLanguage={language}
          defaultValue={CODE_SNIPPETS["javascript"]}
          value={value}
          onMount={onMount}
          onChange={ValueChanged}
          className="rounded"
          language={language}
        />
      </div>
      <Separator className="lg:hidden col-span-12 w-full mt-4" />
      <Output editorRef={EditorRef} language={language} />
    </div>
  );
};

export default CodeEditor;
