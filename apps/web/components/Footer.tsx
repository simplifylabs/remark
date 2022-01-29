import Link from "next/link";

interface IFooterProps {
  hideLinks?: boolean;
}

export default function Footer(props: IFooterProps) {
  return (
    <section className="flex relative flex-col gap-3 justify-center items-center py-10 w-screen bg-white">
      {!props.hideLinks && (
        <div className="flex flex-row flex-wrap gap-10 justify-center items-center px-5 w-full bg-white">
          <Link passHref href="/#features">
            <a className="text-sm text-gray-800 sm:text-lg hover:text-gray-600">
              Features
            </a>
          </Link>
          <Link passHref href="/#download">
            <a className="text-sm text-gray-800 sm:text-lg hover:text-gray-600">
              Download
            </a>
          </Link>
          <Link passHref href="/#contact">
            <a className="text-sm text-gray-800 sm:text-lg hover:text-gray-600">
              Contact
            </a>
          </Link>
        </div>
      )}
      <p className="text-base text-center text-gray-400">
        © {new Date().getFullYear()} Simplify Software.
        <br className="sm:hidden" /> All rights reserved.
      </p>
    </section>
  );
}
