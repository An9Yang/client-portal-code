import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Project Details</h1>
        <p className="text-muted-foreground mt-1">
          View and manage project #{id}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
          <CardDescription>
            Detailed view of the selected project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Project details for ID: {id} coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
