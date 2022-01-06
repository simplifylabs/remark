import { useEffect } from "react";

export default function useTitle(title: string, disableTag: boolean = false) {
  useEffect(() => {
    if (disableTag) document.title = title;
    else document.title = `${title} | Remark`;
  }, [title, disableTag]);

  return null;
}
