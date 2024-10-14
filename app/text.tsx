import { FC, useEffect, useState } from "react";
import { fetchTehilimChapterV3 } from "./sefaria";

export enum Lang {
  English,
  Hebrew,
  Hebrew_English,
}

export function getLangSymbol(lang: Lang): string {
  switch (lang) {
    case Lang.English:
      return "A";
    case Lang.Hebrew:
      return "א";
    case Lang.Hebrew_English:
      return "Aא";
    default:
      return "A";
  }
}

interface TextProps {
  lang: Lang;
  chapter: number;
}

const TextComponent: FC<TextProps> = ({ lang, chapter }) => {
  const [hebrewText, setHebrewText] = useState<string[]>([]);
  const [englishText, setEnglishText] = useState<string[]>([]);

  useEffect(() => {
    const fetchText = async () => {
      const text = await fetchTehilimChapterV3(chapter);
      setHebrewText(text?.hebrew || []);
      setEnglishText(text?.english || []);
    };

    fetchText();
  }, [chapter]); // This effect runs whenever the chapter changes

  return (
    <div id="chapter" className="mt-8 space-y-4">
      {lang === Lang.Hebrew &&
        hebrewText.map((line, index) => (
          <div className="line flex justify-center" key={index}>
            <span
              className="text-center text-lg"
              dangerouslySetInnerHTML={{ __html: line }}
            ></span>
          </div>
        ))}
      {lang === Lang.English &&
        englishText.map((line, index) => (
          <div className="line flex justify-center" key={index}>
            <span
              className="text-center text-lg"
              dangerouslySetInnerHTML={{ __html: line }}
            ></span>
          </div>
        ))}
      {lang === Lang.Hebrew_English &&
        hebrewText.map((line, index) => (
          <div className="line flex justify-between w-full" key={index}>
            <span
              className="side text-right text-lg"
              dangerouslySetInnerHTML={{ __html: line }}
            ></span>
            <span
              className="side text-left text-lg"
              dangerouslySetInnerHTML={{ __html: englishText[index] }}
            ></span>
          </div>
        ))}
    </div>
  );
};

export default TextComponent;
