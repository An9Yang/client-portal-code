import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Track performance metrics and insights.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>
            Comprehensive analytics and reporting tools.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Analytics content coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}