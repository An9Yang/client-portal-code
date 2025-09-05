import { Hono } from "hono";
import { createExampleRoute } from "./example";
import { createAuthRoute } from "./auth";

export function setupRoutes(app: Hono) {
  const routes = new Hono()
    .route("/example", createExampleRoute())
    .route("/auth", createAuthRoute());

  const entry = app.route("/api", routes);

  return entry;
}

export type AppType = ReturnType<typeof setupRoutes>;
