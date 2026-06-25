import { describe, it } from "vitest";
import { expectContractPath } from "./openapi-matchers.js";

describe("vacations contract", () => {
  it("documents vacation endpoints", () => {
    expectContractPath("/vacations", "post", "201");
    expectContractPath("/vacations/{vacationId}", "patch", "200");
    expectContractPath("/vacations/{vacationId}", "delete", "204");
  });
});
