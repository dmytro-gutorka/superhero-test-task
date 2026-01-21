export function toLines(arr: string[] | undefined) {
    return (arr ?? []).join("\n");
}