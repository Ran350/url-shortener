import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { csrf } from "hono/csrf";
import { z } from "zod";

import { Bindings } from "../bindings";
import { basicAuthMiddleware } from "../middleware/basicAuth";

const schema = z.object({
  url: z.string().url(),
});

const validator = zValidator("form", schema, (result, c) => {
  if (!result.success) {
    return c.render(
      <div>
        <h2>Error!</h2>
        <a href="/">Back to top</a>
      </div>
    );
  }
});

const createKey = async (kv: KVNamespace, url: string): Promise<string> => {
  const uuid = crypto.randomUUID();
  const key = uuid.substring(0, 6);
  const result = await kv.get(key);
  if (!result) {
    await kv.put(key, url);
  } else {
    return await createKey(kv, url); // retry if key exists
  }
  return key;
};

const createRoutes = new Hono<{ Bindings: Bindings }>();
createRoutes.post(basicAuthMiddleware, csrf(), validator, async (c) => {
  const { url } = c.req.valid("form");
  const key = await createKey(c.env.KV, url);

  const shortenUrl = new URL(`/${key}`, c.req.url);

  return c.render(
    <div>
      <h2>Created!</h2>
      <input
        type="text"
        value={shortenUrl.toString()}
        style={{
          width: "80%",
        }}
        autofocus
      />
    </div>
  );
});

export { createRoutes };
