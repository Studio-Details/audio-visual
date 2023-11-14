"use client"
import type { NextPage } from "next";
import useSetKey from "@/hook/useSetKey";

const Page: NextPage = () => {
  useSetKey({key: "a", onKeyPress: () => console.log("a press"), onKeyUp: () => console.log("a up")})
  useSetKey({key: "s", onKeyPress: () => console.log("s press"), onKeyUp: () => console.log("s up")})
  return (
    <div>
      <h1>Page</h1>
    </div>
  );
}

export default Page;