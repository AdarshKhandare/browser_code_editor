import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGE_VERSION } from "@/utils/constants";
import { Language } from "./CodeEditor";

const languages: [Language, string][] = Object.entries(LANGUAGE_VERSION) as [
  Language,
  string
][];

const LanguageSelector: React.FC<{
  language: string;
  onSelect: (lang: Language) => void;
}> = ({ language, onSelect }) => {
  return (
    <div className="flex justify-start items-center gap-2 mb-4">
      <span className="text-lg">Language: </span>
      <Select onValueChange={onSelect}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder={language} />
        </SelectTrigger>
        <SelectContent>
          {languages.map(([lang, version]) => {
            return (
              <SelectItem
                key={lang}
                value={lang}
                onChange={() => onSelect(lang)}
                className={`${lang === language ? "active bg-stone-800" : ""}`}>
                {lang} &nbsp;
                <span className="text-sm text-gray-400">{version}</span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
