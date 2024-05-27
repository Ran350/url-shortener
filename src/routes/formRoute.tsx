import { Hono } from "hono";
import { Bindings } from "../bindings";

const formRoutes = new Hono<{ Bindings: Bindings }>();

formRoutes.get((c) => {
  return c.render(
    <div>
      <h2>Create shorten URL!</h2>
      <form action="/create" method="post">
        <input
          type="text"
          name="url"
          autocomplete="off"
          style={{
            width: "80%",
          }}
        />
        &nbsp;
        <button type="submit">Create</button>
      </form>
    </div>
  );
});

export { formRoutes };
