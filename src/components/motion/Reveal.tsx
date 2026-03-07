import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/cn";
import { fadeUp } from "../../motion/variants";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
}>;

export function Reveal({
  children,
  className,
  delay = 0,
  once = true,
  amount = 0.22,
}: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
