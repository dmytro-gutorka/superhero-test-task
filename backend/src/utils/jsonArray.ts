export function encodeStringArray(arr?: string[]): string {
    return JSON.stringify(arr ?? []);
}

export function decodeStringArray(value?: string | null): string[] {
    if (!value) return [];

    try {

        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];

    } catch {

        return [];

    }
}
