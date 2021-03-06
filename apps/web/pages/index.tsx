import { useState, useEffect } from "react";
import { ThumbUpIcon, GlobeAltIcon, EyeIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import Navigation from "@web/components/Navigation";
import Footer from "@web/components/Footer";
import Title from "@web/components/Title";
import AddButton from "@web/components/AddButton";
import LazyShow from "@web/components/LazyShow";
import Image from "next/image";
import Link from "next/link";
import Browser from "@web/util/browser";
import Extension from "@web/util/extension";
import useMediaQuery from "@web/hooks/useMediaQuery";

export default function Home() {
  return (
    <>
      <NextSeo title="Uncensored Comments, anywhere." />
      <div className="relative flex flex-col overflow-y-auto overflow-x-hidden scroll-smooth">
        <Navigation transparent />
        <Hero />
        <Features />
        <Download />
        <Contact />
        <Footer hideLinks />
      </div>
    </>
  );
}

function Hero() {
  const router = useRouter();

  return (
    <LazyShow>
      <section
        id="hero"
        className="relative flex min-h-screen w-screen flex-col items-center justify-center py-0 md:pb-24 md:pt-[10rem] lg:mb-8"
      >
        <Title
          title="Comments, anywhere."
          subtitle="Uncensored & Better"
          primary
        />
        {/* <h1 className="text-6xl font-extrabold text-center">
          Uncensored Comments
          <br />
          <span className="text-6xl text-indigo-600">anywhere you want.</span>
        </h1>
        <p className="max-w-[50vw] text-2xl text-gray-600 mt-10 text-center">
          Consectetur quia quisquam odio perspiciatis quod Laudantium eum asperi
          cupericat aspernatur maiores maiores? Nulla est suscipit velit
          doloribus de la.
        </p> */}
        <div className="flex flex-row gap-5">
          <AddButton className="md:py-4" />
          <button
            onClick={() => router.push("#features")}
            className="btn-secondary hidden md:block"
          >
            Learn More
          </button>
        </div>
        <img
          src="/images/screens/example.png"
          alt="Example"
          className="drop-shadow-example-small md:drop-shadow-example-big mt-[4rem] w-[80vw] md:mt-[8rem] md:w-[70vw]"
        />
        <div className="dotted absolute bottom-0 left-0 z-[-1] hidden h-[50%] w-[22rem] lg:block"></div>
        <div className="dotted absolute top-0 right-0 z-[-1] hidden h-[24rem] w-[20rem] lg:block"></div>
      </section>
    </LazyShow>
  );
}

function Features() {
  return (
    <LazyShow>
      <section
        id="features"
        className="relative flex w-screen flex-row items-center justify-between gap-[10rem] pb-[4rem] md:py-[6rem] xl:gap-0"
      >
        <div
          className={`flex w-full flex-col items-start justify-center px-10 md:px-20 xl:w-1/2 xl:pl-[4rem] xl:pr-0 2xl:pl-[9rem]`}
        >
          <Title title="Just comments, but better." left />
          <p className="text-md mt-4 text-gray-500 sm:text-xl">
            Yes, we only provide a comment system - but a better one! Having a
            uniform comment system has a lot of advantages, here are a few:
          </p>
          <div className="mt-16 flex flex-col items-start gap-12">
            <Feature
              title="Uncensored"
              description="Are your comments always getting deleted by the owner? In Remark, this is not possible anymore. Your comments can only be deleted by violating our Terms of Service."
            >
              <EyeIcon className="h-6 w-6" />
            </Feature>
            <Feature
              title="Better"
              description="Replies, Mentions, Upvotes and Downvotes - we have everything you need! Thanks to our voting system, you will always see the most important comments first."
            >
              <ThumbUpIcon className="h-6 w-6" />
            </Feature>
            <Feature
              title="Anywhere"
              description="You could possibly comment anywhere you want! Even on sites that don't have a comment system. And the best of it - you can do all of that with just one account!"
            >
              <GlobeAltIcon className="h-6 w-6" />
            </Feature>
          </div>
        </div>
        <div className="relative hidden h-full w-1/2 flex-col justify-start pr-[2rem] pl-[3rem] xl:flex 2xl:pr-[4rem] 2xl:pl-[6rem]">
          <div className="dotted absolute right-0 top-1/2 z-[-1] h-[40rem] w-[25rem] -translate-y-1/2 transform"></div>
          <div className="flex flex-col gap-3 rounded-2xl">
            <Comment
              image="1.jpg"
              author="simonsmith"
              text="Always love to see a funny @remark when surfing the web."
            />
            <Comment
              image="2.jpg"
              author="emiliagopp"
              text="Loved @remark the very moment I used it!"
            />
            <Comment
              image="3.jpg"
              author="lindaernstson"
              text="Just found out about @remark, can recommend."
            />
            <Comment
              image="4.jpg"
              author="julianzengerle"
              text="It's finally possible to comment anywhere, with @remark."
            />
          </div>
        </div>
      </section>
    </LazyShow>
  );
}

interface ICommentProps {
  image: string;
  text: string;
  author: string;
}

function Comment(props: ICommentProps) {
  return (
    <div className="flex w-full flex-row items-center justify-start gap-6 rounded-xl bg-white p-5 shadow-lg">
      <Image
        src={`/images/person/${props.image}`}
        className="rounded-full"
        width={50}
        height={50}
        alt={props.author}
      />
      <div className="flex flex-col items-start justify-center">
        <p className="text-gray-500">@{props.author}</p>
        <p className="text-md text-gray-800 2xl:text-lg">{props.text}</p>
      </div>
    </div>
  );
}

interface IFeatureProps {
  title: string;
  description: string;
  children: any;
}

function Feature(props: IFeatureProps) {
  return (
    <div className="flex w-full flex-row items-start gap-5">
      <div className="feature-icon bg-brand flex items-center justify-center rounded-md text-white">
        {props.children}
      </div>
      <div className="w-auto flex-col items-start gap-4">
        <h3 className="text-xl font-medium text-gray-800">{props.title}</h3>
        <p className="text-md text-gray-500 sm:text-lg">{props.description}</p>
      </div>
    </div>
  );
}

function Download() {
  const small = useMediaQuery("(max-width: 600px)");

  const [current] = useState(!Extension.isSupported ? "" : Browser.alias);
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <LazyShow>
      <section
        id="download"
        className="flex w-screen flex-col justify-center py-[4rem] md:py-[6rem]"
      >
        <Title
          title="Download"
          subtitle="Remark Extension"
          subClassName="text-[1rem] md:text-[1.1rem]"
          titleClassName="text-[2.8rem] md:text-5xl"
        />
        <div
          className={`flex ${
            small ? "flex-col" : "flex-row flex-wrap"
          } mt-4 items-center justify-center gap-8 px-12 md:mt-12`}
        >
          <BrowserCard
            name="Firefox"
            color="#FF7139"
            download="https://www.mozilla.org/de/firefox/new/"
            link={Extension.firefoxUrl}
            current={current}
          />
          <BrowserCard
            name="Opera"
            color="#FF1B2D"
            download="https://www.opera.com/de/download"
            link={Extension.operaUrl}
            current={current}
            hidden={small && !expanded}
          />
          <BrowserCard
            name="Chrome"
            color="#4285F4"
            download="https://www.google.com/chrome/"
            link={Extension.chromeUrl}
            current={current}
          />
          <BrowserCard
            name="Vivaldi"
            color="#EF3939"
            download="https://vivaldi.com/download/"
            link={Extension.chromeUrl}
            current={current}
            hidden={small && !expanded}
          />
          <BrowserCard
            name="Edge"
            color="#0078D7"
            download="https://www.microsoft.com/edge"
            link={Extension.edgeUrl}
            current={current}
            hidden={small && !expanded}
          />
          {small && !expanded && (
            <a onClick={() => setExpanded(true)}>Show all...</a>
          )}
        </div>
      </section>
    </LazyShow>
  );
}

interface IBrowserCardProps {
  name: string;
  color: string;
  link: string;
  download: string;
  current: string;
  hidden?: boolean;
}

function BrowserCard(props: IBrowserCardProps) {
  const [current, setCurrent] = useState<boolean>(false);

  useEffect(() => {
    if (Extension.isSupported) setCurrent(props.current == props.name);
    else setCurrent(false);
  }, [props.current]);

  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-8 rounded-xl bg-white p-8 shadow-md ${
        props.hidden && "hidden"
      }`}
    >
      {/*
      {current && (
        <div className="flex absolute top-0 justify-center items-center w-full h-8 rounded-t-lg transform -translate-y-full bg-brand">
          <label className="text-sm text-white">Current</label>
        </div>
      )}
      */}
      <Image
        alt={`${props.name} Icon`}
        src={`/images/browser/${props.name.toLowerCase()}.svg`}
        width={50}
        height={50}
      />
      <div className="flex flex-col items-center">
        <p className="text-2xl font-medium">{props.name}</p>
        <a
          style={{ color: props.color }}
          href={props.download}
          target="_blank"
          rel="noreferrer"
          className="text-md -mt-1 uppercase hover:opacity-70"
        >
          Download
        </a>
      </div>
      <button
        onClick={() => window.open(props.link)}
        className={`${current ? "btn-primary" : "btn-outline"} whitespace-pre`}
      >
        {current ? `Add to ${props.name}` : "View in Store"}
      </button>
    </div>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="relative mt-12 flex w-full flex-row items-start justify-evenly gap-10 bg-white py-[4rem] px-10 md:py-[5rem] lg:mt-32"
    >
      <div className="flex w-auto flex-col items-start justify-evenly gap-10 md:w-full md:flex-row md:flex-wrap xl:items-center">
        <div className="flex flex-col items-start">
          <label className="text-sm uppercase text-gray-500">
            Contact Info
          </label>
          <div className="flex flex-col items-start">
            <a className="text-lg text-gray-800" href="tel:+436706081524">
              +43 670 6081524
            </a>
            <a className="text-lg text-gray-800" href="mailto:paul@koeck.dev">
              paul@koeck.dev
            </a>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <label className="text-sm uppercase text-gray-500">Address</label>
          <p className="text-lg text-gray-800">
            Weinberggasse 53
            <br />
            6800 Feldkirch, Austria
          </p>
        </div>
        <div className="flex flex-col items-start">
          <label className="text-sm uppercase text-gray-500">Legal</label>
          <div className="flex flex-col items-start">
            <Link passHref href="/privacy">
              <a className="text-lg text-gray-800 hover:text-gray-600">
                Privacy
              </a>
            </Link>
            <Link passHref href="/terms">
              <a className="text-lg text-gray-800 hover:text-gray-600">Terms</a>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <label className="text-sm uppercase text-gray-500">Info</label>
          <div className="flex flex-col items-start">
            <Link passHref href="/#features">
              <a className="text-lg text-gray-800 hover:text-gray-600">
                Features
              </a>
            </Link>
            <Link passHref href="/#download">
              <a className="text-lg text-gray-800 hover:text-gray-600">
                Download
              </a>
            </Link>
          </div>
        </div>
      </div>
      <hr className="absolute bottom-0 left-1/2 h-[2px] w-[90vw] -translate-x-1/2 transform bg-[rgba(0,0,0,0.08)]"></hr>
    </section>
  );
}
