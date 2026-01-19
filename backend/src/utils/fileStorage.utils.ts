import path from "path";
import { promises as fs } from "fs";
import { env } from "./env.utils";

export function buildImageUrl(filename: string): string {
    return `${env.SERVER_BASE_URL}/static/${filename}`;
}

export function resolveImagePathFromUrl(url: string): string | null {
    const marker = "/static/";
    const idx = url.indexOf(marker);

    if (idx === -1) return null;

    const filename = url.slice(idx + marker.length);

    if (!filename) return null;

    return path.resolve(env.UPLOAD_DIR, filename);
}

export async function safeUnlink(filePath: string): Promise<boolean> {

    try {

        await fs.unlink(filePath);
        return true;

    } catch (err: any) {

        if (err?.code === "ENOENT") return false;
        throw err;

    }
}
