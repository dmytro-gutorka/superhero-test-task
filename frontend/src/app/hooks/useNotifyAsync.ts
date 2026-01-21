import { useSnackbar } from "../../ui/Snackbar.tsx";

export function useNotifyAsync() {
    const { notify } = useSnackbar();

    return async function run<T>(
        fn: () => Promise<T>,
        opts: {
            success?: string | ((result: T) => string);
            error?: string | ((err: unknown) => string);
            severityOnError?: "error" | "warning";
        } = {},
    ): Promise<T | null> {
        try {
            const result = await fn();
            if (opts.success) {
                notify(
                    typeof opts.success === "function" ? opts.success(result) : opts.success,
                    "success",
                );
            }
            return result;
        } catch (err: any) {
            const msg =
                typeof opts.error === "function"
                    ? opts.error(err)
                    : (opts.error ?? err?.message ?? "Something went wrong");
            notify(msg, opts.severityOnError ?? "error");
            return null;
        }
    };
}
