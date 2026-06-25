import * as Tooltip from "@radix-ui/react-tooltip";
import { AlertTriangle } from "lucide-react";
import type { Overlap } from "../../lib/api-client/client";

export function OverlapMarker({ overlap }: { overlap: Overlap }) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className="overlap-marker" aria-label="Sobreposicao">
            <AlertTriangle size={16} />
            {overlap.startDate} - {overlap.endDate}
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="tooltip">
            {overlap.employeeIds.length} colaboradores envolvidos
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
