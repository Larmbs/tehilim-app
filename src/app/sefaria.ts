import DOMPurify from "dompurify";

/**
 * Represents the response structure for the Tehilim (Psalms) API.
 */
export interface TehilimResponse {
  english: string[]; // Array containing English text lines for the specified chapter.
  hebrew: string[];  // Array containing Hebrew text lines for the specified chapter.
}

/**
 * Fetches the specified chapter of Tehilim (Psalms) in both English and Hebrew.
 *
 * @param chapter - The chapter number to fetch (should be between 1 and 150).
 * @returns A promise that resolves to a TehilimResponse object containing sanitized English and Hebrew texts, or null if the fetch fails.
 */
export async function fetchTehilimChapterV3(
  chapter: number
): Promise<TehilimResponse | null> {
  // Construct URLs for fetching English and Hebrew texts from the Sefaria API.
  const english_url = `https://www.sefaria.org/api/v3/texts/Psalms ${chapter}?version=english`;
  const hebrew_url = `https://www.sefaria.org/api/v3/texts/Psalms ${chapter}?version=hebrew`;

  // Fetch the English and Hebrew texts, defaulting to empty arrays on failure.
  const english_dirty = (await fetchText(english_url)) || [];
  const hebrew_dirty = (await fetchText(hebrew_url)) || [];

  // Sanitize and format the fetched English and Hebrew texts.
  const english = DOMPurify.sanitize(english_dirty.join("\n") || "")
    .replaceAll("<br>", "")
    .split("\n");
  const hebrew = DOMPurify.sanitize(hebrew_dirty.join("\n") || "").split("\n");

  return { english, hebrew }; // Return the sanitized texts as a TehilimResponse object.
}

/**
 * Fetches text data from a given URL and returns it as an array of strings.
 *
 * @param url - The URL from which to fetch the text data.
 * @returns A promise that resolves to an array of strings containing the fetched text, or null if the fetch fails.
 */
async function fetchText(url: string): Promise<string[] | null> {
  try {
    // Perform the fetch request to the specified URL.
    const response = await fetch(url);

    // Check if the response is OK (status in the range 200-299).
    if (!response.ok) {
      throw new Error(
        `Error fetching reference ${url}: ${response.statusText}`
      );
    }

    // Parse the JSON response and return the text content.
    const data = await response.json();

    return data.versions[0].text; // Return the text from the first version.
  } catch (error) {
    // Log an error message if the fetch fails.
    console.error("Failed to fetch parasha reference:", error);
    return null; // Return null on error.
  }
}
