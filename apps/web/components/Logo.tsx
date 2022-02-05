import Image from "next/image";
import { NextRouter } from "next/router";

interface ILogoProps {
  centered?: boolean;
  router: NextRouter;
}

export default function Logo(props: ILogoProps) {
  return (
    <div
      onClick={() => props.router.push("/#")}
      className={`group flex cursor-pointer flex-row items-center ${
        props.centered && "absolute left-1/2 -translate-x-1/2 transform"
      } `}
    >
      <Image
        src="/images/logo/black.svg"
        alt="Remark Logo"
        className="transition-all group-hover:opacity-80"
        height={25}
        width={25}
      />
      <a className="font-pacifico ml-3 text-2xl text-black group-hover:opacity-80">
        Remark
      </a>
    </div>
  );
}
