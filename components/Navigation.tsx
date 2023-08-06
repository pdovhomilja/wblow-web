import Link from "next/link";

import NewAccountDialog from "./dialog/NewAccount";
import { Button } from "./ui/button";

type Props = {};

const Navigation = (props: Props) => {
  return (
    <div className="space-x-5">
      <Link href={"/about"}>O nás</Link>
      <Link href={"/price"}>Ceník</Link>
      <NewAccountDialog />
      <Button asChild>
        <Link href={"/sign-in"}>Přihlásit</Link>
      </Button>
    </div>
  );
};

export default Navigation;
