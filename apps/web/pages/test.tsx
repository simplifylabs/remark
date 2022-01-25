import useExtension from "@web/hooks/useExtension";

export default function Test() {
  const { installed, loading } = useExtension({ required: false });

  if (!loading && !installed)
    return <div className="w-screen h-screen bg-red-500"></div>;
  if (!loading && installed)
    return <div className="w-screen h-screen bg-green-500"></div>;
  return null;
  // return (
  //   <div className="w-screen h-screen flex flex-col justify-center items-center text-5xl">
  //     Installed: {installed ? "True" : "False"}
  //     <br />
  //     Loading: {loading ? "True" : "False"}
  //   </div>
  // );
}
