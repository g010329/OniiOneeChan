"use client";
import { motion } from "framer-motion";

interface StepperProps {
  childrens: React.ReactNode[];
  currentStep: number;
}

function Stepper({ childrens, currentStep }: StepperProps) {
  const getRandomSwing = () => ({
    x: Math.random() * 20 - 10, // Random value between -10 and 10
    transition: {
      duration: 2 + Math.random() * 2, // Random duration between 2 and 4 seconds
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  });

  return (
    <div
      className="w-full transition-transform duration-300 ease-in-out flex"
      style={{ transform: `translateX(-${currentStep * 100}%)` }}
    >
      {childrens.map((step, idx) => (
        <div
          key={idx}
          className="w-full flex-shrink-0 flex items-center justify-center"
        >
          {idx === 1 && (
            <div className="w-[300px] space-y-10">
              {[
                "/img_3.png",
                "/img_1.png",
                "/img_2.png",
                "/img_1.png",
                "/img_3.png",
                "/img_2.png",
              ].map((src, imgIdx) => (
                <motion.img
                  key={imgIdx}
                  src={src}
                  alt="img"
                  className={`w-[${[80, 60, 80, 60, 50, 60][imgIdx]}px] ml-[${
                    [60, -40, 100, 0, 180, 0][imgIdx]
                  }px]`}
                  animate={getRandomSwing()}
                />
              ))}
            </div>
          )}
          {step}
          {idx === 1 && (
            <div className="w-[300px] space-y-10">
              {[
                "/img_1.png",
                "/img_3.png",
                "/img_1.png",
                "/img_2.png",
                "/img_1.png",
                "/img_3.png",
              ].map((src, imgIdx) => (
                <motion.img
                  key={imgIdx}
                  src={src}
                  alt="img"
                  className={`w-[${[40, 80, 60, 80, 40, 80][imgIdx]}px] ml-[${
                    [100, 260, 180, 80, 290, 160][imgIdx]
                  }px]`}
                  animate={getRandomSwing()}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export { Stepper };
