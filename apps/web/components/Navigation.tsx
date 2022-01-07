import AddButton from "@web/components/AddButton";
import LazyShow from "@web/components/LazyShow";
import Logo from "@web/components/Logo";
import Link from "next/link";
import { useRouter } from "next/router";

interface INavigationProps {
  uninstall?: boolean;
}

export default function Navigation(props: INavigationProps) {
  const router = useRouter();

  return (
    <LazyShow opacityOnly>
      <header className="absolute top-0 left-0 z-[100]">
        <div className="relative w-screen h-auto lg:h-[5rem] bg-background/70 flex flex-col lg:flex-row justify-between items-center lg:px-[3rem] gap-4 lg:gap-0 py-5 lg:py-0">
          {props.uninstall ? (
            <>
              <div></div>
              <Logo centered router={router} />
              <AddButton reinstall dynamic className="hidden lg:block" />
            </>
          ) : (
            <>
              <Logo router={router} />
              <ul className="flex justify-evenly items-center w-full lg:absolute lg:left-1/2 lg:gap-16 lg:justify-center lg:w-auto lg:transform lg:-translate-x-1/2">
                <li>
                  <Link passHref href="/#features">
                    <a className="text-gray-800 sm:text-lg hover:text-gray-600 text-md">
                      Features
                    </a>
                  </Link>
                </li>
                <li>
                  <Link passHref href="/#download">
                    <a className="text-gray-800 sm:text-lg hover:text-gray-600 text-md">
                      Download
                    </a>
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/simplifylabs/remark"
                    target="_blank"
                    className="text-gray-800 sm:text-lg hover:text-gray-600 text-md"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
              <AddButton dynamic className="hidden lg:block" />
            </>
          )}
        </div>
      </header>
    </LazyShow>
  );
}
