import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "primereact/button";

const Layout = ({ children }: any) => {
  const { data: session } = useSession();

  return (
    <>
      <Link href="/">
        <a>Home</a>
      </Link>
      <div>
        {session?.user?.name}
        {session?.user ? (
          <Button onClick={() => signOut()}>Logout</Button>
        ) : (
          <Button onClick={() => signIn()}>Login</Button>
        )}
      </div>
      <main>{children}</main>
    </>
  );
};

export default Layout;
