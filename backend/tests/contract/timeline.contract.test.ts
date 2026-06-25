import { describe, it } from "vitest";
import { expectContractPath } from "./openapi-matchers.js";

describe("timeline contract", () => {
  it("documents timeline endpoint", () => {
    expectContractPath("/teams/{teamId}/timeline", "get", "200");
  });
});
