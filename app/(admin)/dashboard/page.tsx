import React from "react";
import { User, getServerSession } from "next-auth";
import moment from "moment";
import { authOptions } from "@/lib/auth";

import { getLicense } from "@/actions/get-license";
import Container from "@/components/Container";

import PrivateKey from "../_components/PrivateKey";
import LicenseTable from "../_components/LicenseTable";

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
      <LicenseTable license={license} />
      <PrivateKey session={session} />
    </Container>
  );
};

export default DashboardPage;
