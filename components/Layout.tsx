import Head from "next/head";
import Link from "next/link";
import React from "react";
import Header from "./Header";

const Layout = ({ children }: any) => {
  return (
    <>
      <Head>
        <title>ChallengesApp</title>
      </Head>
      <Header />
      <main>
        <div className="flex">
          <div className="flex flex-column">
            <Link href="/">
              <a>All</a>
            </Link>
            <Link href="/joined">
              <a>Joined by you</a>
            </Link>
            <Link href="/created">
              <a>Created by you</a>
            </Link>
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </main>
    </>
  );
};

export default Layout;
