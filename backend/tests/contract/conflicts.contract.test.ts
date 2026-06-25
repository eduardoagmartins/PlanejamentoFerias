import { describe, it } from "vitest";
import { expectContractPath } from "./openapi-matchers.js";

describe("conflicts contract", () => {
  it("documents conflicts endpoint", () => {
    expectContractPath("/teams/{teamId}/conflicts", "get", "200");
  });
});
