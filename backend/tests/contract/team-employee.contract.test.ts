import { describe, it } from "vitest";
import { expectContractPath } from "./openapi-matchers.js";

describe("team and employee contract", () => {
  it("documents team and employee endpoints", () => {
    expectContractPath("/teams", "get", "200");
    expectContractPath("/teams", "post", "201");
    expectContractPath("/teams/{teamId}", "patch", "200");
    expectContractPath("/teams/{teamId}", "delete", "204");
    expectContractPath("/teams/{teamId}/employees", "get", "200");
    expectContractPath("/teams/{teamId}/employees", "post", "201");
  });
});
