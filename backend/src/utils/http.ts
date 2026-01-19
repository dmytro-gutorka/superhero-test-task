import { HttpError } from "../errors/HttpError";

export function getStringParam(value: unknown, name: string = "id"): string {
    if (typeof value === "string" && value.length) return value;

    throw HttpError.badRequest(`Missing or invalid param: ${name}`);
}
