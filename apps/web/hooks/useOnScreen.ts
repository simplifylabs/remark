import { RefObject, useEffect, useState } from "react";

export default function useOnScreen(
  ref: RefObject<HTMLDivElement>,
  rootMargin = "0px"
) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    let currentRef: Element | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );

    if (ref.current) {
      currentRef = ref.current;
      observer.observe(currentRef);
    } else {
      setIntersecting(true);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      else setIntersecting(true);
    };
  }, [ref, rootMargin]);

  return isIntersecting;
}
