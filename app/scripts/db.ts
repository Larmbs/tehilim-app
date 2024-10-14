
interface SessionData {
    contacts: string[],
    max_chapters: number | null,
}

export async function createSession(data: SessionData): Promise<string> {
    const fetchData = async () => {
        const response = await fetch(`/api/create_session?contacts=${data.contacts}&max_chapters=${data.max_chapters || 1}`);
        const result = await response.json();
        result.
      };
}

export function next(): Promise<boolean> {

}   
