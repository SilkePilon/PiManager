"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FeatureOption {
  id: number;
  title: string;
  description: string;
  code: string;
}

interface FeatureSelectorProps {
  features: FeatureOption[];
}

export const FeatureSelector: React.FC<FeatureSelectorProps> = ({
  features,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 relative">
      <div className="md:col-span-2 border-b md:border-b-0 bg-background md:border-r border-border sticky top-[var(--header-height)]">
        <div
          className="flex md:flex-col feature-btn-container overflow-x-auto p-4 pb-2"
          id="feature-selector"
        >
          {features.map((option, index) => (
            <motion.button
              key={option.id}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-64 md:w-full text-left p-4 mb-2 mr-2 last:mr-0 md:mr-0 rounded-lg border border-border ${
                selectedIndex === index ? "bg-accent/70" : "hover:bg-muted/50"
              }`}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.05,
                duration: 0.3,
              }}
            >
              <h3 className="font-medium tracking-tight">{option.title}</h3>
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
      <div className="col-span-1 md:col-span-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: Math.random() * 0.5,
            }}
            className="bg-background font-mono text-sm [&>pre]:!bg-transparent [&>pre]:p-4 [&_code]:break-all overflow-auto md:max-h-[calc(100vh-var(--header-height)-2rem)] md:sticky md:top-[var(--header-height)]"
            dangerouslySetInnerHTML={{ __html: features[selectedIndex].code }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};
