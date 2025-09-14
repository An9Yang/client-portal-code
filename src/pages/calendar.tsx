import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Calendar() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your events.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calendar View</CardTitle>
          <CardDescription>
            Schedule and track your events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Calendar content coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
