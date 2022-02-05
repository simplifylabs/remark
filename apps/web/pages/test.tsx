import useExtension from "@web/hooks/useExtension";

export default function Test() {
  const { installed, loading } = useExtension({ required: false });

  if (!loading && !installed)
    return <div className="h-screen w-screen bg-red-500"></div>;
  if (!loading && installed)
    return <div className="h-screen w-screen bg-green-500"></div>;
  return null;
  // return (
  //   <div className="flex flex-col justify-center items-center w-screen h-screen text-5xl">
  //     Installed: {installed ? "True" : "False"}
  //     <br />
  //     Loading: {loading ? "True" : "False"}
  //   </div>
  // );
}
