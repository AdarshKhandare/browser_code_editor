import React, { useState } from "react";
import { Button } from "./ui/button";
import { executecode } from "@/utils/api";
import * as monaco from "monaco-editor";
import { Language } from "./CodeEditor";
interface OutputProps {
  editorRef: React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>;
  language: Language;
}
const Output: React.FC<OutputProps> = ({ editorRef, language }) => {
  const [output, setOutput] = useState<undefined | null | string>(null);
  const [loading, setLoading] = useState(false);
  const runCode = async () => {
    const sourceCode = editorRef?.current?.getValue();
    if (!sourceCode) return;
    if (output !== "") {
      setOutput("");
    }
    try {
      setLoading(true);
      const { run } = await executecode(language, sourceCode);
      console.log("Output", run);
      setOutput(run.output);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-full col-span-12 lg:col-span-6 mt-4 lg:mt-0">
      <div className="flex justify-between items-center gap-2 mb-4">
        <span className="text-lg">Output</span>
        <Button className="" onClick={runCode} disabled={loading}>
          {" "}
          {loading ? (
            <span className="relative flex h-6 w-6">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-900 opacity-95"></span>
              <span className="relative inline-flex rounded-full h-6 w-6 bg-blue-700"></span>
            </span>
          ) : (
            "Run"
          )}
        </Button>
      </div>
      <div className="h-[80vh] rounded-lg border border-stone-800 p-4 bg-neutral-900 text-gray-300">
        {output ? (
          output
        ) : loading ? (
          <span className="relative flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-900 opacity-95"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 bg-blue-700"></span>
          </span>
        ) : (
          'Click "Run" to see the output here'
        )}
      </div>
    </div>
  );
};

export default Output;
