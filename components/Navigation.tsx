import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import RegistrDialog from "./dialog/registr";

type Props = {};

const Navigation = (props: Props) => {
  return (
    <div className="space-x-5">
      <Link href={"/about"}>O nás</Link>
      <Link href={"/price"}>Ceník</Link>
      <RegistrDialog />
    </div>
  );
};

export default Navigation;
