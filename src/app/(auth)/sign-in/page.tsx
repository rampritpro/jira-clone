import { redirect } from "next/navigation";
import React from "react";

import { getCurrent } from "@/features/auth/actions";
import { SignInCard } from "@/features/auth/components/sign-in-card";

const SignIn = async () => {
  const user = await getCurrent();
  if (user) redirect("/");
  return <SignInCard />;
};

export default SignIn;
