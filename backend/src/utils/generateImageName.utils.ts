export default function generateImageName(extension: string): string {
    return `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
}
