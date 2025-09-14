import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Team() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Team</h1>
        <p className="text-muted-foreground mt-1">
          Manage team members and permissions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Management</CardTitle>
          <CardDescription>
            View and manage your team members.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Team content coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
