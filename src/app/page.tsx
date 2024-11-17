import { redirect } from "next/navigation";
import React from "react";

import { UserButton } from "@/components/user-button";
import { getCurrent } from "@/features/auth/actions";

const Home = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div>
      <p>Only authenticate user</p>
      <div className="flex p-5 gap-4">
        <UserButton />
      </div>
    </div>
  );
};

export default Home;
