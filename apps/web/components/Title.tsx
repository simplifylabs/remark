interface ITitleProps {
  id?: string;
  title: string;
  subtitle?: string;
  subClassName?: string;
  titleClassName?: string;
  primary?: boolean;
  left?: boolean;
}

export default function Title(props: ITitleProps) {
  return (
    <div
      className={`flex flex-col ${
        props.left ? "items-start" : "items-center"
      } ${!props.left && "mb-8 px-4 text-center"}`}
    >
      {props.subtitle && (
        <p
          className={`text-brand font-medium uppercase tracking-widest ${
            props.primary
              ? "text-lg sm:text-xl md:text-2xl"
              : "text-lg md:text-xl"
          } ${props.subClassName || ""}`}
        >
          {props.subtitle}
        </p>
      )}
      {props.primary ? (
        <h1
          id={props.id}
          className={`text-5xl font-extrabold md:text-6xl ${
            props.titleClassName || ""
          }`}
        >
          {props.title}
        </h1>
      ) : (
        <h2
          id={props.id}
          className={`text-4xl font-extrabold md:text-5xl ${
            props.titleClassName || ""
          }`}
        >
          {props.title}
        </h2>
      )}
    </div>
  );
}
