import { describe, it } from "vitest";
import { expectContractPath } from "./openapi-matchers.js";

describe("day-offs contract", () => {
  it("documents day-off endpoints", () => {
    expectContractPath("/day-offs", "post", "201");
    expectContractPath("/day-offs/{dayOffId}", "patch", "200");
    expectContractPath("/day-offs/{dayOffId}", "delete", "204");
  });
});
