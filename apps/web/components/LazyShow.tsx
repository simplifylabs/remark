import { useEffect, createRef } from "react";
import { motion, useAnimation } from "framer-motion";
import useOnScreen from "@hooks/useOnScreen";

interface ILazyShowProps {
  children: any;
  opacityOnly?: boolean;
}

export default function LazyShow({ opacityOnly, children }: ILazyShowProps) {
  const controls = useAnimation();
  const rootRef = createRef<HTMLDivElement>();
  const onScreen = useOnScreen(rootRef);

  useEffect(() => {
    if (!onScreen) return;

    controls.start({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    });
  }, [onScreen, controls]);

  return (
    <motion.div
      className="lazy-div"
      ref={rootRef}
      initial={opacityOnly ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}
