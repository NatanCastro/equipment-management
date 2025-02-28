import { err, ok, Result } from "@/types/result";
import { invoke } from "@tauri-apps/api/core";

type Payload = Record<string, unknown>;

export const invokeTauriCommand = async <T>(command: string, payload?: Payload): Promise<Result<T>> => {
  try {
    return ok(await invoke<T>(command, payload));
  } catch (error: unknown) {
    console.error(`Tauri command failed: ${command}`, error);
    return err(error as Error);
  }
};

