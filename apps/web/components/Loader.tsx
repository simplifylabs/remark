interface ILoaderProps {
  size?: number;
  small?: boolean;
  big?: boolean;
  white?: boolean;
}

export default function Loader(props: ILoaderProps) {
  function getSize() {
    if (props.size) return props.size;
    if (props.small) return 1.25;
    if (props.big) return 3;
    return 2;
  }

  return (
    <svg
      style={{
        width: getSize() + "rem",
        height: getSize() + "rem",
      }}
      className={`animate-spin text-white mx-auto`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className={`opacity-25 ${props.white ? "text-white" : "text-brand"}`}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth={"4"}
      ></circle>
      <path
        className={`opacity-75 ${props.white ? "text-white" : "text-brand"}`}
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}
