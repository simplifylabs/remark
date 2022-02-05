import Link from "next/link";

interface IFooterProps {
  hideLinks?: boolean;
}

export default function Footer(props: IFooterProps) {
  return (
    <section className="relative flex w-screen flex-col items-center justify-center gap-3 bg-white py-10">
      {!props.hideLinks && (
        <div className="flex w-full flex-row flex-wrap items-center justify-center gap-10 bg-white px-5">
          <Link passHref href="/#features">
            <a className="text-sm text-gray-800 hover:text-gray-600 sm:text-lg">
              Features
            </a>
          </Link>
          <Link passHref href="/#download">
            <a className="text-sm text-gray-800 hover:text-gray-600 sm:text-lg">
              Download
            </a>
          </Link>
          <Link passHref href="/#contact">
            <a className="text-sm text-gray-800 hover:text-gray-600 sm:text-lg">
              Contact
            </a>
          </Link>
        </div>
      )}
      <p className="text-center text-base text-gray-400">
        © {new Date().getFullYear()} Simplify Software.
        <br className="sm:hidden" /> All rights reserved.
      </p>
    </section>
  );
}
