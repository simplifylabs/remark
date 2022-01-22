import React, { useEffect, useState, Ref } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { UserIcon, CogIcon, XIcon } from "@heroicons/react/outline";
import { connect, IRootState } from "@browser/state/index";
import { hideSidebar } from "@browser/actions/render";
import { setTyping, postComment } from "@browser/actions/comment";
import { IReply } from "@browser/reducers/comment";
import Darkmode from "@browser/util/darkmode";
import App from "@browser/util/app";
import API from "@browser/util/api";
import Render from "@browser/util/render";
import List from "@browser/components/List";
import TextSwitch from "@browser/components/TextSwitch";

interface ISidebarProps {
  showen: boolean;
  isLoggedIn: boolean;
  replying: IReply | null;
  hide: typeof hideSidebar;
  typing: typeof setTyping;
  post: typeof postComment;
  settings: () => void;
}

function Home(props: ISidebarProps) {
  const [textarea, setTextarea] = useState<HTMLTextAreaElement>();
  const [value, setValue] = useState("");

  useEffect(() => {
    check();

    // I'm sorry...
    const interval = setInterval(check, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Render.on("remark:post", post);
    return () => Render.off("remark:post", post);
  }, [value, props.replying]);

  useEffect(() => {
    if (!textarea) return;

    textarea.addEventListener("keydown", keydown);
    return () => textarea && textarea.removeEventListener("keydown", keydown);
  }, [textarea, value]);

  useEffect(() => {
    if (props.showen) {
      document.body.addEventListener("click", close);

      if (value) props.typing(true);
      else props.typing(false);
    }

    return () => {
      document.body.removeEventListener("click", close);
    };
  }, [props.showen]);

  function close(e: MouseEvent) {
    const launcher = document.querySelector("#remark-launcher");
    const target = e.target as HTMLElement;

    // Some browsers may not support this
    if (!launcher.contains || !target) return;

    if (
      launcher.contains(target) ||
      target.classList.contains("remark__suggestions__item__display")
    )
      return;

    props.hide();
  }

  function keydown(e: KeyboardEvent) {
    if (e.key == "Enter" && !e.shiftKey) {
      e.preventDefault();

      const suggestions = Render.sidebarQuerySelector(
        ".remark__suggestions__list"
      );
      if (suggestions) return;

      post();
    }
  }

  function post() {
    if (!value || !value.replace(/\s/g, "").length) return;
    let modified = value;
    let isReplying = false;

    if (props.replying) {
      const mention = `@[${props.replying.author.username}](${props.replying.author.id}) `;

      if (modified.startsWith(mention)) {
        modified = modified.replace(mention, "");
        isReplying = true;
      }
    }

    if (textarea) textarea.blur();
    props.post(modified, isReplying ? props.replying.commentId : null, () =>
      setValue("")
    );

    return value;
  }

  function check() {
    Darkmode.checkSidebar();
  }

  function signIn() {
    window.open(`${App.webUrl}auth/signin`);
  }

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center gap-2">
        <TextSwitch options={["Always", "Smart", "Never"]} />
        <div className="w-full grow h-[2.2rem] bg-white dark:bg-background-form rounded-lg shadow-sm flex flex-row justify-between items-center px-1">
          <UserIcon
            onClick={() => window.open(`${App.webUrl}profile`)}
            className="btn-icon text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          />
          <CogIcon
            onClick={() => props.settings()}
            className="btn-icon text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          />
          <XIcon
            onClick={() => props.hide()}
            className="btn-icon text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          />
        </div>
      </div>
      <List setValue={setValue} input={textarea} />
      <div className="flex flex-row w-full">
        {props.isLoggedIn ? (
          <Input
            value={value}
            set={setValue}
            inputRef={setTextarea}
            typing={props.typing}
          />
        ) : (
          <button
            onClick={signIn}
            className="btn-disabled w-[calc(100%-3.4rem)] py-[0.6rem]"
          >
            Sign In
          </button>
        )}
      </div>
    </>
  );
}

interface IInputProps {
  inputRef: Ref<HTMLTextAreaElement>;
  value: string;
  set: (value: string) => void;
  typing: (to: boolean) => void;
}

function Input(props: IInputProps) {
  async function fetchUsers(query: string, callback: (any: []) => void) {
    if (!query) return;

    const res = await API.get(["user", `list?q=${query}`]);
    if (!res.success) return callback([]);

    callback(
      res.body.list.map((u: any) => ({
        display: `${u.username}`,
        id: u.id,
      }))
    );
  }

  return (
    <div className="w-[calc(100%-3.4rem)] h-auto">
      <MentionsInput
        inputRef={props.inputRef}
        placeholder="Create Remark..."
        rows={1}
        className="remark"
        value={props.value}
        onChange={(e) => {
          props.set(e.target.value);
          if (e.target.value) props.typing(true);
          else props.typing(false);
        }}
        style={{
          control: {
            fontWeight: "normal",
          },
          "&multiLine": {
            control: {
              minHeight: 42.75,
              maxHeight: 200,
              overflow: "auto",
              resize: "none",
              background: "transparent",
            },
            highlighter: {
              maxHeight: 200,
              padding: "8.5px 12px",
              /* The 1px invisible border is
               * important for position  */
              border: "1px solid transparent",
            },
            input: {
              padding: "8.5px 12px",
            },
          },
          suggestions: {
            list: {
              backgroundColor: "white",
              border: "1px solid rgba(0,0,0,0.15)",
              fontSize: 14,
              maxHeight: 105,
              overflow: "hidden",
              borderRadius: 8,
              position: "absolute",
              bottom: 14,
            },
            item: {
              padding: "5px 15px",
              borderBottom: "1px solid rgba(0,0,0,0.15)",
              "&focused": {
                backgroundColor: "rgba(0, 0, 0, 0.08)",
              },
            },
          },
        }}
      >
        <Mention
          displayTransform={(_, b) => `@${b}`}
          trigger="@"
          data={fetchUsers}
          className="remark__mention"
          appendSpaceOnAdd
        />
      </MentionsInput>
    </div>
  );
}

const mapStateToProps = (state: IRootState) => ({
  showen: state.render.sidebar,
  isLoggedIn: state.user.isLoggedIn,
  replying: state.comment.replying,
});

const mapDipatchToProps = {
  hide: hideSidebar,
  typing: setTyping,
  post: postComment,
};

//@ts-ignore
export default connect(mapStateToProps, mapDipatchToProps)(Home);
