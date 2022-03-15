import Footer from "@web/components/Footer";
import Navigation from "@web/components/Navigation";
import useTitle from "@web/hooks/useTitle";

export default function Welcome() {
  useTitle("Get Started");

  return (
    <div className="h-full w-full">
      <Navigation hideLinks closeIcon />
      <Hero />
      <Spacer />
      <Section title="The Remark Button" image="button">
        The button in bottom right allows you toggle the sidebar. It will be
        automatically shown when a Remark has been posted on the current site.{" "}
        <br />
        <br />
        If the button is distracting you, you can always hover on it and press
        the X or disable Remark for this domain.
        <br />
      </Section>
      <Section title="Action Icon" image="action" flip>
        You can use the action icon, usually shown in the top right of your
        browser, to toggle the Sidebar - even if the Remark button isn&apos;t
        shown.
        <br />
        <br />
        Furthermore, you can set Hotkeys to toggle the sidebar and/or button for
        even quicker access to Remark.
      </Section>
      <Section title="Show Modes" image="modes">
        The different Show Modes allow you to control when the button should be
        automatically shown for this <b className="text-lg">Domain.</b>
        <br />
        <br />
        &quot;Smart&quot; will only show if a Remark has been posted on that
        site. You can change the default behaviour in the settings.
      </Section>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative mt-12 flex h-[35vh] w-full items-center justify-center py-8">
      <div className="dotted absolute left-0 top-1/2 hidden h-[72%] w-[13rem] -translate-y-1/2 md:block"></div>
      <div className="dotted absolute right-0 top-1/2 hidden h-[72%] w-[13rem] -translate-y-1/2 md:block"></div>
      <div className="flex flex-col items-center px-8 text-center">
        <h1 className="text-5xl font-extrabold">Get started with Remark</h1>
        <p className="mt-3 text-xl text-gray-500">
          This short introduction will show you everything you need to know to
          get started!
        </p>
      </div>
    </section>
  );
}

function Spacer() {
  return (
    <div className="flex flex-row items-center gap-12">
      <div className="h-[2px] w-full bg-black/20"></div>
      <img src="/images/logo/logo.png" alt="Remark Logo" className="w-16" />
      <div className="h-[2px] w-full bg-black/20"></div>
    </div>
  );
}

interface ISectionProps {
  flip?: boolean;
  title: string;
  image: any;
  children: any;
}

function Section(props: ISectionProps) {
  return (
    <section
      className={`relative flex flex-col-reverse ${
        props.flip ? "md:flex-row-reverse" : "md:flex-row"
      } my-[7rem] items-center justify-evenly gap-10 px-8 md:gap-0 md:px-[10vw]`}
    >
      <img
        src={`/images/screens/${props.image}.png`}
        className="h-full drop-shadow-md md:h-[17vw]"
        alt={props.title}
      />
      <div className="flex flex-col gap-1 md:max-w-[32vw]">
        <label className="text-md text-brand uppercase">Using Remark</label>
        <h2 className="text-4xl font-bold">{props.title}</h2>
        <p className="mt-6 text-lg text-gray-700">{props.children}</p>
      </div>
    </section>
  );
}
