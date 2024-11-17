import "server-only";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import {
  Account,
  Account as AccountType,
  Databases,
  Databases as DatabasesType,
  Storage,
  Storage as StorageType,
  Users,
  Client,
  Models,
  Users as UsersType,
} from "node-appwrite";

import { AUTH_COOKIE } from "@/features/auth/constant";

type AdditionalContext = {
  Variables: {
    account: AccountType;
    storage: StorageType;
    databases: DatabasesType;
    users: UsersType;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddlware = createMiddleware<AdditionalContext>(
  async (c, next) => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);
    const session = getCookie(c, AUTH_COOKIE);
    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    client.setSession(session);
    const account = new Account(client);
    const databases = new Databases(client);
    const storage = new Storage(client);
    const users = new Users(client);
    const user = await account.get();
    c.set("account", account);
    c.set("databases", databases);
    c.set("storage", storage);
    c.set("users", users);
    c.set("user", user);

    await next();
  }
);
