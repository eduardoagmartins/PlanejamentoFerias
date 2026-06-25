import { expect } from "vitest";
import { loadOpenApiContract } from "../../src/contracts/openapi.js";

export function expectContractPath(path: string, method: string, status: string) {
  const contract = loadOpenApiContract();
  const operation = contract.paths[path]?.[method.toLowerCase()] as { responses?: Record<string, unknown> } | undefined;
  expect(operation, `${method.toUpperCase()} ${path} must exist in OpenAPI`).toBeTruthy();
  expect(operation?.responses?.[status], `${status} response must exist in OpenAPI`).toBeTruthy();
}

export function expectErrorShape(payload: unknown) {
  expect(payload).toEqual(expect.objectContaining({ message: expect.any(String) }));
}
