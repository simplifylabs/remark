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
      } ${!props.left && "px-4 mb-8 text-center"}`}
    >
      {props.subtitle && (
        <p
          className={`tracking-widest uppercase font-medium text-brand ${
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
          className={`text-5xl md:text-6xl font-extrabold ${
            props.titleClassName || ""
          }`}
        >
          {props.title}
        </h1>
      ) : (
        <h2
          id={props.id}
          className={`text-4xl md:text-5xl font-extrabold ${
            props.titleClassName || ""
          }`}
        >
          {props.title}
        </h2>
      )}
    </div>
  );
}
