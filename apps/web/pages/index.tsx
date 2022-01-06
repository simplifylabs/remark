import { useState, useEffect } from "react";
import { ThumbUpIcon, GlobeAltIcon, EyeIcon } from "@heroicons/react/outline";
import Navigation from "@web/components/Navigation";
import Footer from "@web/components/Footer";
import Title from "@web/components/Title";
import AddButton from "@web/components/AddButton";
import LazyShow from "@web/components/LazyShow";
import Image from "next/image";
import Link from "next/link";
import Browser from "@web/util/browser";
import Extension from "@web/util/extension";
import useTitle from "@web/hooks/useTitle";
import useMediaQuery from "@web/hooks/useMediaQuery";

export default function Home() {
  useTitle("Uncensored Comments, anywhere. | Remark");

  return (
    <>
      <div className="flex overflow-y-auto overflow-x-hidden relative flex-col scroll-smooth">
        <Navigation />
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
  return (
    <LazyShow>
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-center items-center py-0 md:py-24 md:pt-[10rem] w-screen md:mb-[4rem]"
      >
        <Title
          title="Comments, anywhere."
          subtitle="Uncensored & Better"
          primary
        />
        <AddButton className="md:py-4" />
        <div className="w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[65vw] 2xl:w-[60vw] mt-0 md:mt-4">
          <div className="relative w-full pb-[56.25%]">
            <div className="absolute w-full h-full bg-gray-800 border-4 border-gray-300 shadow-md lg:shadow-xl mt-24 rounded-[1.2rem] sm:rounded-[1.5rem] md:rounded-[2rem] xl:rounded-[3rem] p-[0.4rem] xs:p-[0.5rem] md:p-[0.75rem] xl:p-[0.85rem] 2xl:p-[1rem]">
              <div className="relative w-full h-full bg-white rounded-[0.8rem] sm:rounded-[1.33rem] md:rounded-[1.25rem] xl:rounded-[2rem]"></div>
            </div>
          </div>
        </div>
      </section>
    </LazyShow>
  );
}

function Features() {
  return (
    <LazyShow>
      <section
        id="features"
        className="relative w-screen pb-[4rem] md:py-[6rem] flex flex-row justify-between items-center gap-[10rem] xl:gap-0"
      >
        <div className="relative w-1/2 h-full flex-col justify-start pr-[2rem] xl:pr-[5rem] 2xl:pr-[7rem] pl-[2rem] xl:pl-[5rem] 2xl:pl-[7rem] hidden xl:flex">
          <div className="absolute left-0 top-1/2 dotted w-[25rem] h-[40rem] z-[-1] transform -translate-y-1/2"></div>
          <div className="flex flex-col gap-3 rounded-2xl">
            <Comment
              image="person1.jpg"
              author="simonsmith"
              text="Always love to see a funny @remark when surfing the web."
            />
            <Comment
              image="person2.jpg"
              author="emiliagopp"
              text="Loved @remark the very moment I used it!"
            />
            <Comment
              image="person3.jpg"
              author="lindaernstson"
              text="Just found out about @remark, can recommend."
            />
            <Comment
              image="person4.jpg"
              author="julianzengerle"
              text="It's finally possible to comment anywhere, with @remark."
            />
          </div>
        </div>
        <div
          className={`w-full xl:w-1/2 flex flex-col justify-center items-start px-10 md:px-20 xl:pr-[9rem] xl:pl-0`}
        >
          <Title title="Just comments, but better." left />
          <p className="mt-4 text-gray-500 sm:text-xl text-md">
            Yes, we only provide a comment system - but a better one! Having a
            uniform comment system has a lot of advantages, here are a few:
          </p>
          <div className="flex flex-col gap-12 items-start mt-16">
            <Feature
              title="Uncensored"
              description="Are your comments always getting deleted by the owner? In Remark, this is not possbile anymore. Your comments can only be deleted by violating our Terms of Service."
            >
              <EyeIcon className="w-6 h-6" />
            </Feature>
            <Feature
              title="Better"
              description="Replies, Mentions, Upvotes and Downvotes - we have everything you need! Thanks to our voting system, you will always see the most important comments first."
            >
              <ThumbUpIcon className="w-6 h-6" />
            </Feature>
            <Feature
              title="Anywhere"
              description="You could possibly comment anywhere you want! Even on sites that don't have a comment system. And the best of it - you can do all of that with just one account!"
            >
              <GlobeAltIcon className="w-6 h-6" />
            </Feature>
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
    <div className="flex flex-row gap-6 justify-start items-center p-5 w-full bg-white rounded-xl shadow-lg">
      <Image
        src={`/images/${props.image}`}
        className="rounded-full"
        width={50}
        height={50}
        alt={props.author}
      />
      <div className="flex flex-col justify-center items-start">
        <p className="text-gray-500">@{props.author}</p>
        <p className="text-gray-800 2xl:text-lg text-md">{props.text}</p>
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
    <div className="flex flex-row gap-5 items-start w-full">
      <div className="flex justify-center items-center text-white rounded-md feature-icon bg-brand">
        {props.children}
      </div>
      <div className="flex-col gap-4 items-start w-auto">
        <h3 className="text-xl font-medium text-gray-800">{props.title}</h3>
        <p className="text-gray-500 sm:text-lg text-md">{props.description}</p>
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
        className="w-screen py-[4rem] md:py-[6rem] flex flex-col justify-center"
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
          } justify-center items-center gap-8 mt-4 md:mt-12 px-12`}
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
      className={`relative bg-white p-8 shadow-md rounded-xl flex flex-col justify-center items-center gap-8 ${
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
        src={`/images/${props.name.toLowerCase()}.svg`}
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
          className="-mt-1 uppercase hover:opacity-70 text-md"
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
      className="relative w-full py-[4rem] md:py-[5rem] flex flex-row px-10 bg-white gap-10 justify-evenly items-start mt-12 lg:mt-32"
    >
      <div className="flex flex-col gap-10 justify-evenly items-start w-auto md:flex-row md:flex-wrap md:w-full xl:items-center">
        <div className="flex flex-col items-start">
          <label className="text-sm text-gray-500 uppercase">
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
          <label className="text-sm text-gray-500 uppercase">Address</label>
          <p className="text-lg text-gray-800">
            Wolf-Huber-Straße 31
            <br />
            6800 Feldkirch, Austria
          </p>
        </div>
        <div className="flex flex-col items-start">
          <label className="text-sm text-gray-500 uppercase">Legal</label>
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
          <label className="text-sm text-gray-500 uppercase">Info</label>
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
      <hr className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90vw] h-[2px] bg-[rgba(0,0,0,0.08)]"></hr>
    </section>
  );
}
