import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { setCookie, deleteCookie } from "hono/cookie";
import { ID } from "node-appwrite";

import { AUTH_COOKIE } from "../constant";
import { loginSchema, registerSchema } from "../schemas";
import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddlware } from "@/lib/sesson-middleware";

const app = new Hono()
  .get("/current", sessionMiddlware, (c) => {
    const user = c.get("user");
    return c.json({ data: user });
  })
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = c.req.valid("json");
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({ sucess: true });
  })
  .post("/register", zValidator("json", registerSchema), async (c) => {
    const { firstName, lastName, email, password } = c.req.valid("json");

    const { account } = await createAdminClient();
    await account.create(
      ID.unique(),
      email,
      password,
      firstName + " " + lastName
    );
    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({ sucess: true });
  })
  .post("/logout", sessionMiddlware, async (c) => {
    const account = c.get("account");
    deleteCookie(c, AUTH_COOKIE);
    await account.deleteSession("current");
    return c.json({ success: true });
  });
export default app;
