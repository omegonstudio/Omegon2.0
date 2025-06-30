"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { InlineWidget } from "react-calendly";

interface CalendlyModalProps {
  open: boolean;
  onClose: () => void;
  calendlyUrl: string;
}

const CalendlyModal: React.FC<CalendlyModalProps> = ({
  open,
  onClose,
  calendlyUrl,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-0 py-0 mt-20 mx-0 max-h-[85vh] overflow-hidden"
          >
            {/* Modal container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[85vh] my-0 py-0 rounded-2xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-lg shadow-xl"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 text-white hover:text-yellow-300 transition"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Calendly iframe */}
              <div className="w-full h-[85vh] overflow-hidden">
                <InlineWidget
                  url={calendlyUrl}
                  styles={{ height: "100%", width: "100%", overflow: "hidden" }}
                  pageSettings={{
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: false,
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CalendlyModal;
