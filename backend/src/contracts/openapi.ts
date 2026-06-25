import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

export type OpenApiDocument = {
  paths: Record<string, Record<string, unknown>>;
  components?: Record<string, unknown>;
};

export function loadOpenApiContract(contractPath = path.resolve("..", "shared", "contracts", "openapi.yaml")): OpenApiDocument {
  return YAML.parse(fs.readFileSync(contractPath, "utf8")) as OpenApiDocument;
}
