import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Reports() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Reports</h1>
        <p className="text-muted-foreground mt-1">
          Generate and view detailed reports.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reports</CardTitle>
          <CardDescription>
            Generate comprehensive reports for your projects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Reports content coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}