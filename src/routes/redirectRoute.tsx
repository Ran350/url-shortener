import { Hono } from "hono";
import { Bindings } from "../bindings";

const redirectRoutes = new Hono<{ Bindings: Bindings }>();

redirectRoutes.get("/:key{[0-9a-z]{6}}", async (c) => {
  const key = c.req.param("key");
  const url = await c.env.KV.get(key);
  if (url === null) {
    return c.notFound();
  }
  return c.redirect(url);
});

export { redirectRoutes };
