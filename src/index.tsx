import { Hono } from "hono";

import { Bindings } from "./bindings";
import { renderer } from "./renderer";
import { createRoutes } from "./routes/createRoutes";
import { formRoutes } from "./routes/formRoute";
import { redirectRoutes } from "./routes/redirectRoute";

const app = new Hono<{ Bindings: Bindings }>();

app.all("*", renderer);

app.route("/", formRoutes);
app.route("/create", createRoutes);
app.route("/", redirectRoutes);

export default app;
