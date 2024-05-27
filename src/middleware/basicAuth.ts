import { MiddlewareHandler } from "hono";
import { basicAuth } from "hono/basic-auth";

const basicAuthMiddleware: MiddlewareHandler = async (c, next) => {
  const auth = basicAuth({
    username: c.env.USERNAME,
    password: c.env.PASSWORD,
  });
  return auth(c, next);
};

export { basicAuthMiddleware };
