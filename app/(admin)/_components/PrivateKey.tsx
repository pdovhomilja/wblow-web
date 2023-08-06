"use client";
import { useToast } from "@/components/ui/use-toast";
import { CopyIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  session: any;
};

const PrivateKey = ({ session }: Props) => {
  const { toast } = useToast();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: "Zkopírováno",
      description: "Privátní kód byl zkopírován do schránky",
    });
  };
  return (
    <div className="space-y-5">
      {" "}
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Váš privátní kód
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Privátní kód je kód, který je přiřazen k vašemu účtu. Tento kód je
        uřčený k přístupu do prostoru společnosti {session.user.name} na adrese{" "}
        <Link
          href="https://app.wblow.online"
          target={"_blank"}
          className="text-blue-500"
        >
          https://app.wblow.online
        </Link>
      </p>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight space-x-5">
        Váš privátní kód je:{" "}
        <span className="text-3xl font-bold">{session.user.publicKey}</span>
        <CopyIcon
          className="inline-block ml-2 w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700"
          onClick={() => onCopy(session.user.publicKey)}
        />
      </h3>
      {/* <pre>{JSON.stringify(session.user, null, 2)}</pre> */}
    </div>
  );
};

export default PrivateKey;
