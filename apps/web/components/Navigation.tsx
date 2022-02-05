import { useRouter } from "next/router";
import { XIcon } from "@heroicons/react/solid";
import AddButton from "@web/components/AddButton";
import Logo from "@web/components/Logo";
import Link from "next/link";

interface INavigationProps {
  uninstall?: boolean;
  transparent?: boolean;
  hideLinks?: boolean;
  closeIcon?: boolean;
}

export default function Navigation(props: INavigationProps) {
  const router = useRouter();

  return (
    <header className="absolute top-0 left-0 z-[100]">
      <div
        className={`relative h-auto w-screen lg:h-[5rem] ${
          !props.transparent ? "bg-background/70" : ""
        } flex flex-col items-center justify-between gap-4 py-5 lg:flex-row lg:gap-0 lg:px-[3rem] lg:py-0`}
      >
        {props.uninstall ? (
          <>
            <div></div>
            <Logo centered router={router} />
            <AddButton reinstall dynamic className="hidden lg:block" />
          </>
        ) : (
          <>
            <Logo router={router} />
            {!props.hideLinks ? (
              <ul className="flex w-full items-center justify-evenly lg:absolute lg:left-1/2 lg:w-auto lg:-translate-x-1/2 lg:transform lg:justify-center lg:gap-16">
                <li>
                  <Link passHref href="/#features">
                    <a className="text-md text-gray-800 hover:text-gray-600 sm:text-lg">
                      Features
                    </a>
                  </Link>
                </li>
                <li>
                  <Link passHref href="/#download">
                    <a className="text-md text-gray-800 hover:text-gray-600 sm:text-lg">
                      Download
                    </a>
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/simplifylabs/remark"
                    target="_blank"
                    rel="noreferrer"
                    className="text-md text-gray-800 hover:text-gray-600 sm:text-lg"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            ) : null}

            {props.closeIcon ? (
              <button
                onClick={() => router.push("/")}
                className="hidden rounded-md p-2 transition-all hover:bg-black/5 lg:block"
              >
                <XIcon className="h-6 w-6 text-gray-500" />
              </button>
            ) : (
              <AddButton dynamic className="hidden lg:block" />
            )}
          </>
        )}
      </div>
    </header>
  );
}
