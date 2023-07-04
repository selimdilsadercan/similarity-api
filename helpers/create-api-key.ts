import { ApiKey } from "@prisma/client";
import { ZodIssue } from "zod";

export interface CreateApiData {
  error: string | ZodIssue[] | null;
  createdApiKey: ApiKey | null;
}

export async function createApiKey() {
  const res = await fetch("/api/api-key/create");
  const data = (await res.json()) as CreateApiData;

  console.log(data);

  if (data.error || !data.createdApiKey) {
    if (data.error instanceof Array) throw new Error(data.error.join(", "));
    else throw new Error(data.error ?? "Something went wrong");
  }

  return data.createdApiKey.key;
}
