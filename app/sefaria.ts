import DOMPurify from "dompurify";

export interface TehilimResponse {
  english: string[];
  hebrew: string[];
}

export async function fetchTehilimChapterV3(
  chapter: number
): Promise<TehilimResponse | null> {
  const english_url = `https://www.sefaria.org/api/v3/texts/Psalms ${chapter}?version=english`;
  const hebrew_url = `https://www.sefaria.org/api/v3/texts/Psalms ${chapter}?version=hebrew`;

  const english_dirty = (await fetchText(english_url)) || [];
  const hebrew_dirty = (await fetchText(hebrew_url)) || [];

  const english = DOMPurify.sanitize(english_dirty.join("\n") || "")
    .replaceAll("<br>", "")
    .split("\n");
  const hebrew = DOMPurify.sanitize(hebrew_dirty.join("\n") || "").split("\n");

  return { english, hebrew };
}

async function fetchText(url: string): Promise<string[] | null> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Error fetching reference ${url}: ${response.statusText}`
      );
    }

    const data = await response.json();

    return data.versions[0].text;
  } catch (error) {
    console.error("Failed to fetch parasha reference:", error);
    return null;
  }
}
