import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/cn";
import { frameReveal } from "../../motion/variants";

type FrameRevealProps = PropsWithChildren<{
  className?: string;
  once?: boolean;
}>;

export function FrameReveal({ children, className, once = true }: FrameRevealProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={frameReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
