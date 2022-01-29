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
      className={`flex flex-row items-center cursor-pointer group ${
        props.centered && "absolute left-1/2 transform -translate-x-1/2"
      } `}
    >
      <Image
        src="/images/logo/black.svg"
        alt="Remark Logo"
        className="transition-all group-hover:opacity-80"
        height={25}
        width={25}
      />
      <a className="ml-3 text-2xl text-black group-hover:opacity-80 font-pacifico">
        Remark
      </a>
    </div>
  );
}
