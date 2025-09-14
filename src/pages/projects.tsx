import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Projects() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="text-muted-foreground mt-1">
          Manage and track all your projects.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>
            View and manage your active projects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Projects list coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
