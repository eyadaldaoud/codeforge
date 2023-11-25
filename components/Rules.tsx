import { Terminal, Waves } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function Rules() {
  return (
    <Alert className="mb-2">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        <ol>
          <li>You're allowed to post max 3 scripts/day.</li>

          <li className="mt-1 mb-1">Video must be hosted on Youtube.</li>
          <li>Must have clear instructions.</li>
        </ol>
      </AlertDescription>
    </Alert>
  );
}
