import type { Db } from "../db/connection.js";
import { detectOverlaps } from "../domain/absence-overlap.js";
import { TimelineService } from "./timeline.service.js";
import { TeamsService } from "./teams.service.js";

export class ConflictsService {
  private readonly timeline: TimelineService;
  private readonly teams: TeamsService;

  constructor(db: Db) {
    this.timeline = new TimelineService(db);
    this.teams = new TeamsService(db);
  }

  list(managerId: string, teamId: string, startDate: string, endDate: string) {
    this.teams.ensure(managerId, teamId);
    return detectOverlaps(teamId, this.timeline.getAbsences(teamId, startDate, endDate));
  }
}
