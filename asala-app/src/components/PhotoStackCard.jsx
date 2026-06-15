import React, { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./PhotoStackCard.css";

const imageContainerVariants = {
  initial: {},
  hover: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const imageVariants = {
  initial: { scale: 1, rotate: 0, y: 0 },
  hover: (i) => ({
    scale: 1.05,
    rotate: (i - 1) * 10,
    y: -20,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  }),
};

const cardVariants = {
  inactive: {
    scale: 1,
    y: 0,
    zIndex: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  active: {
    scale: 1.05,
    y: -15,
    zIndex: 10,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export const PhotoStackCard = forwardRef(({ className = "", images, category, title, subtitle, isActive, ...props }, ref) => {
  const displayImages = images.slice(0, 3);

  return (
    <motion.div
      ref={ref}
      className={`photo-stack-card group ${className}`}
      variants={cardVariants}
      animate={isActive ? "active" : "inactive"}
      {...props}
    >
      <div className="photo-stack-content">
        <p className="photo-stack-category">{category}</p>
        <h2 className="photo-stack-title">{title}</h2>
        <p className="photo-stack-subtitle">{subtitle}</p>
      </div>

      <motion.div
        className="photo-stack-images"
        variants={imageContainerVariants}
        initial="initial"
        whileHover="hover"
      >
        <AnimatePresence>
          {displayImages.map((src, i) => (
            <motion.img
              key={src}
              src={src}
              alt={`${title} image ${i + 1}`}
              custom={i}
              variants={imageVariants}
              className="photo-stack-img"
              style={{
                transform: `rotate(${(i - 1) * 4}deg)`,
              }}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});
PhotoStackCard.displayName = "PhotoStackCard";
