import { motion } from "framer-motion";



export const StaggeredText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const words = text.split(" ");
  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[2vw] lg:mr-[1.5vw]">
          <motion.span
            initial={{ y: "100%", rotate: 5 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.1 }}
            className="inline-block transform-origin-bottom-left"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};
