import axios from "axios";
import { LANGUAGE_VERSION } from "./constants";
import { Language } from "@/components/CodeEditor";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executecode = async (language: Language, sourceCode: string) => {
  console.log(`Executing: ${language} `);
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSION[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};
