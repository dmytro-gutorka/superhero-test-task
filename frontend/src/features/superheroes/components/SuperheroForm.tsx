import { Box, Stack, TextField } from "@mui/material";
import type { CreateSuperheroDto, SuperheroDto, UpdateSuperheroDto } from "../../../api/types";
import { useMemo, useState } from "react";

type Props = {
    mode: "create" | "edit";
    initial?: SuperheroDto;
    submitting?: boolean;
    onSubmit: (dto: CreateSuperheroDto | UpdateSuperheroDto) => void;
    formId?: string;
};

function toLines(arr: string[] | undefined) {
    return (arr ?? []).join("\n");
}
function fromLines(text: string) {
    return text
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
}

export function SuperheroForm({ mode, initial, onSubmit, formId }: Props) {
    const defaults = useMemo(() => {
        return {
            nickname: initial?.nickname ?? "",
            realName: initial?.realName ?? "",
            originDescription: initial?.originDescription ?? "",
            catchPhrase: initial?.catchPhrase ?? "",
            superpowersText: toLines(initial?.superpowers ?? []),
        };
    }, [initial]);

    const [nickname, setNickname] = useState(defaults.nickname);
    const [realName, setRealName] = useState(defaults.realName);
    const [originDescription, setOriginDescription] = useState(defaults.originDescription);
    const [catchPhrase, setCatchPhrase] = useState(defaults.catchPhrase);
    const [superpowersText, setSuperpowersText] = useState(defaults.superpowersText);

    return (
        <Box
            component="form"
            id={formId}
            onSubmit={(e) => {
                e.preventDefault();

                const dtoBase = {
                    nickname: nickname.trim(),
                    realName: realName.trim() || undefined,
                    originDescription: originDescription.trim() || undefined,
                    catchPhrase: catchPhrase.trim() || undefined,
                };

                const superpowers = fromLines(superpowersText);

                if (mode === "create") {
                    onSubmit({
                        ...dtoBase,
                        superpowers,
                    } satisfies CreateSuperheroDto);
                } else {
                    onSubmit({
                        ...dtoBase,
                        superpowers,
                    } satisfies UpdateSuperheroDto);
                }
            }}
        >
            <Stack spacing={2}>
                <TextField
                    label="Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                    fullWidth
                />

                <TextField
                    label="Real name"
                    value={realName}
                    onChange={(e) => setRealName(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="Origin description"
                    value={originDescription}
                    onChange={(e) => setOriginDescription(e.target.value)}
                    multiline
                    minRows={3}
                    fullWidth
                />

                <TextField
                    label="Superpowers (one per line)"
                    value={superpowersText}
                    onChange={(e) => setSuperpowersText(e.target.value)}
                    multiline
                    minRows={4}
                    fullWidth
                />

                <TextField
                    label="Catch phrase"
                    value={catchPhrase}
                    onChange={(e) => setCatchPhrase(e.target.value)}
                    fullWidth
                />
            </Stack>
        </Box>
    );
}
