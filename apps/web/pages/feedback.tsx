import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AddButton from "@web/components/AddButton";
import Navigation from "@web/components/Navigation";
import Alert from "@web/components/Alert";
import useTitle from "@web/hooks/useTitle";
import API from "@web/util/api";

export default function Feedback() {
  useTitle("Feedback");
  const router = useRouter();

  const [error, setError] = useState<string | undefined>();
  const [finished, setFinished] = useState<boolean>(false);
  const [uninstall, setUninstall] = useState<boolean>(false);
  const [statements, setStatements] = useState<string[]>([]);
  const [comment, setComment] = useState<string | undefined>();

  useEffect(() => {
    if (!router.isReady) return;
    setUninstall(router.query.source == "uninstall");
  }, [router]);

  function add(text: string) {
    setStatements([...statements, text]);
  }

  function remove(text: string) {
    setStatements([...statements.filter((entry) => entry !== text)]);
  }

  async function submit() {
    setError(undefined);

    if (statements.length == 0 && !comment)
      return setError("Please select at least one option");

    const data: { [key: string]: any } = {
      statements,
    };

    if (comment) data.comment = comment;
    const res = await API.post(["feedback"], data);

    if (res && res.success) return setFinished(true);
    if (!res) return setError("We are currently offline!");

    switch (res.error) {
      case "VALIDATION_ERROR":
        return setError(res.message || "Validation Error");
      case "RATE_LIMIT_EXCEEDED":
        return setError("Rate Limit exceeded!");
      default:
        console.error(res);
        return setError("Something unexpected happened!");
    }
  }

  return (
    <div className="flex min-h-screen w-screen flex-col items-center">
      <Navigation uninstall={uninstall} />
      <div className="mt-auto"></div>
      {finished ? (
        <>
          <h1 className="text-6xl font-extrabold">Thanks</h1>
          <p className="text-brand text-xl uppercase tracking-widest">
            for your feedback
          </p>
          <div className="mt-12 flex flex-col items-center gap-1">
            {uninstall ? (
              <>
                <label className="text-sm text-gray-600">
                  Changed your mind?
                </label>
                <AddButton reinstall />
              </>
            ) : (
              <>
                <label className="text-sm text-gray-600">Need help?</label>
                <button
                  onClick={() => router.push("/welcome")}
                  className="btn-primary"
                >
                  See Tutorial
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <p className="text-brand text-xl uppercase tracking-widest">
            Please give us
          </p>
          <h1 className="text-5xl font-extrabold">Feedback</h1>

          <h2 className="text-basesm:text-lg mt-12 mb-4 text-gray-700">
            {uninstall
              ? "Why did you uninstall Remark?"
              : "What don't you like about Remark?"}
          </h2>
          <div className="flex w-[90vw] flex-col gap-2 sm:w-[18rem]">
            <div className="flex flex-col justify-start pl-2">
              <Option
                add={add}
                remove={remove}
                type="HARDLY_USED"
                text="Hardly ever used it"
              />
              <Option
                add={add}
                remove={remove}
                type="NOT_ENOUGH_COMMENTS"
                text="Not enough comments"
              />
              <Option
                add={add}
                remove={remove}
                type="BAD_COMMENTS"
                text="Bad comments"
              />
              <Option
                add={add}
                remove={remove}
                type="DISTRACTING_BUTTON"
                text="Distracting button"
              />
            </div>
            <textarea
              rows={3}
              className="mt-4 w-full resize-none"
              placeholder="Other feedback..."
              onChange={(e) => setComment(e.target.value)}
            />
            {error && <Alert type="ERROR" text={error} />}
            <button onClick={submit} className="btn-primary w-full">
              Submit
            </button>
          </div>
        </>
      )}

      <div className="mb-auto"></div>
    </div>
  );
}

interface IOptionProps {
  type: string;
  text: string;
  add: (type: string) => void;
  remove: (type: string) => void;
}

function Option(props: IOptionProps) {
  const [id] = useState(Math.random().toString(16));
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) props.add(props.type);
    else props.remove(props.type);
  }, [checked]);

  return (
    <div className="flex flex-row items-center gap-4">
      <input
        className="h-4 w-4 cursor-pointer"
        type="checkbox"
        name={id}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <label
        onClick={() => setChecked(!checked)}
        className="cursor-pointer select-none text-base sm:text-lg"
        htmlFor={id}
      >
        {props.text}
      </label>
    </div>
  );
}
