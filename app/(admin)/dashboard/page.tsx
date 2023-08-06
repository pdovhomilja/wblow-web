import { getLicense } from "@/actions/get-license";
import Container from "@/components/Container";
import { useToast } from "@/components/ui/use-toast";
import { authOptions } from "@/lib/auth";
import { CopyIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import PrivateKey from "../_components/PrivateKey";

type Props = {};

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  //console.log(session, "session");
  if (!session) return null;
  const license: any = await getLicense(session.user.id);

  return (
    <Container
      title="Dashboard"
      description={
        "Vítejte v administraci společnosti " +
        session.user.name +
        ". Zde si můžete spravovat své licence. A také editovat firemní profil"
      }
    >
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Vaše licence
      </h2>
      <div className="py-10">
        <pre>{JSON.stringify(license, null, 2)}</pre>
      </div>
      <PrivateKey session={session} />
    </Container>
  );
};

export default DashboardPage;
