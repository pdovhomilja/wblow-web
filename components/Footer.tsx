import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="flex flex-row h-8 justify-end items-center w-full text-xs text-gray-500 p-5">
      <div className="hidden md:flex space-x-2 pr-2">
        powered by Next.js{" "}
        <span className="bg-black rounded-md text-white px-1">13</span> hosted
        by:
        <span className="text-bold underline">
          <Link href="https://www.vercel.com">Vercel</Link>
        </span>
      </div>
      <div className="hidden md:flex space-x-2">
        Supported by:
        <Link className="pl-1 font-bold" href="https://www.softbase.cz">
          SoftBase s.r.o.
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
