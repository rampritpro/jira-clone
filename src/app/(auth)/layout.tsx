import Image from "next/image";
import React, { PropsWithChildren } from "react";

import { Button } from "@/components/ui/button";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <Image src="/logo.svg" alt="logo" height={56} width={152} />
          <Button variant={"secondary"}>Sign Up</Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
