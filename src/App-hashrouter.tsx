import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoginShadcn from "./pages/login-shadcn";
import DashboardShadcn from "./pages/dashboard-shadcn";
import AnalyticsShadcn from "./pages/analytics-shadcn";
import ReportsShadcn from "./pages/reports-shadcn";
import ProjectsShadcn from "./pages/projects-shadcn";
import ProjectDetailShadcn from "./pages/project-detail-shadcn";
import TasksShadcn from "./pages/tasks-shadcn";
import TeamShadcn from "./pages/team-shadcn";
import CalendarShadcn from "./pages/calendar-shadcn";
import MessagesShadcn from "./pages/messages-shadcn";
import SettingsShadcn from "./pages/settings-shadcn";
import NotFoundShadcn from "./pages/404-shadcn";
import DashboardLayoutShadcn from "./layouts/dashboard-layout-shadcn";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster richColors position="top-right" />
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginShadcn />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayoutShadcn />}>
              <Route path="/dashboard" element={<DashboardShadcn />} />
              <Route path="/analytics" element={<AnalyticsShadcn />} />
              <Route path="/reports" element={<ReportsShadcn />} />
              <Route path="/projects" element={<ProjectsShadcn />} />
              <Route path="/projects/:id" element={<ProjectDetailShadcn />} />
              <Route path="/tasks" element={<TasksShadcn />} />
              <Route path="/team" element={<TeamShadcn />} />
              <Route path="/calendar" element={<CalendarShadcn />} />
              <Route path="/messages" element={<MessagesShadcn />} />
              <Route path="/settings" element={<SettingsShadcn />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundShadcn />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;