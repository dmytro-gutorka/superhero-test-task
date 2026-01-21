export function fromLines(text: string) {
    return text
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
}