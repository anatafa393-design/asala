import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './MagneticButton.css';

/**
 * MagneticButton — ينجذب نحو مؤشر الماوس عند الاقتراب
 * 
 * Props:
 *  - children      : محتوى الزر
 *  - variant       : 'primary' | 'outline'  (default: 'primary')
 *  - onClick       : دالة النقر
 *  - strength      : قوة الجذب 0-1  (default: 0.4)
 *  - className     : كلاسات إضافية
 */
const MagneticButton = ({
  children,
  variant = 'primary',
  onClick,
  strength = 0.4,
  className = '',
  ...props
}) => {
  const ref = useRef(null);

  // Raw motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring config — كلما قل الـ stiffness كلما صار الجذب أبطأ وأناعم
  const springX = useSpring(x, { stiffness: 180, damping: 15 });
  const springY = useSpring(y, { stiffness: 180, damping: 15 });

  // Spring for depth effect
  const innerX = useSpring(x, { stiffness: 200, damping: 12 });
  const innerY = useSpring(y, { stiffness: 200, damping: 12 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={`magnetic-btn magnetic-btn--${variant} ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {/* Inner element moves more than the outer for depth effect */}
      <motion.span
        className="magnetic-btn__inner"
        style={{
          x: innerX,
          y: innerY
        }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

export default MagneticButton;
