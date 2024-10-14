import { FC, useEffect, useState } from "react";
import { fetchTehilimChapterV3 } from "../scripts/sefaria";

/**
 * Enum representing the available languages for displaying text.
 */
export enum Lang {
  English,         // English language option
  Hebrew,          // Hebrew language option
  Hebrew_English,  // Both Hebrew and English displayed together
}

/**
 * Returns the symbol representing the specified language.
 *
 * @param lang - The language option to convert to a symbol.
 * @returns A string symbol representing the language (e.g., "A" for English).
 */
export function getLangSymbol(lang: Lang): string {
  switch (lang) {
    case Lang.English:
      return "A"; // Symbol for English
    case Lang.Hebrew:
      return "א"; // Symbol for Hebrew
    case Lang.Hebrew_English:
      return "Aא"; // Symbol for Hebrew-English
    default:
      return "A"; // Default symbol
  }
}

/**
 * Props for the TextComponent.
 */
interface TextProps {
  lang: Lang;   // Language option for displaying text
  chapter: number; // Chapter number to fetch and display
}

/**
 * Component for displaying the Tehilim (Psalms) text in the selected language.
 *
 * @param lang - The selected language for displaying text.
 * @param chapter - The chapter number of Tehilim to display.
 * @returns A React functional component displaying the text of the specified chapter.
 */
const TextComponent: FC<TextProps> = ({ lang, chapter }) => {
  const [hebrewText, setHebrewText] = useState<string[]>([]);   // State for storing Hebrew text
  const [englishText, setEnglishText] = useState<string[]>([]); // State for storing English text

  // Effect to fetch the Tehilim chapter text when the chapter number changes.
  useEffect(() => {
    const fetchText = async () => {
      const text = await fetchTehilimChapterV3(chapter); // Fetch the text for the given chapter
      setHebrewText(text?.hebrew || []);    // Set the Hebrew text state
      setEnglishText(text?.english || []);  // Set the English text state
    };

    fetchText(); // Call the fetch function
  }, [chapter]); // Run the effect when the chapter changes

  return (
    <div id="chapter" className="mt-8 space-y-4">
      {/* Render Hebrew text if the selected language is Hebrew */}
      {lang === Lang.Hebrew &&
        hebrewText.map((line, index) => (
          <div className="line flex justify-center" key={index}>
            <span
              className="text-center text-lg"
              dangerouslySetInnerHTML={{ __html: line }}
            ></span>
          </div>
        ))}
      {/* Render English text if the selected language is English */}
      {lang === Lang.English &&
        englishText.map((line, index) => (
          <div className="line flex justify-center" key={index}>
            <span
              className="text-center text-lg"
              dangerouslySetInnerHTML={{ __html: line }}
            ></span>
          </div>
        ))}
      {/* Render both Hebrew and English text if the selected language is Hebrew_English */}
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
