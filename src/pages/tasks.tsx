import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Tasks() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Tasks</h1>
        <p className="text-muted-foreground mt-1">
          Manage and track your tasks.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task Management</CardTitle>
          <CardDescription>
            View and manage your tasks and to-dos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Tasks content coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
