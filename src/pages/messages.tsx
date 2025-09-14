import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Messages() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Messages</h1>
        <p className="text-muted-foreground mt-1">
          View and send messages.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Message Center</CardTitle>
          <CardDescription>
            Communicate with your team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Messages content coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
