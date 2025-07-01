"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
} from "framer-motion";
import React, { useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const { scrollY } = useScroll();
  const lastY = useMotionValue(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [scrolledEnough, setScrolledEnough] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastY.get();
    lastY.set(latest);
    const direction = latest > prev ? "down" : "up";
    setScrollDirection(direction);
    setScrolledEnough(latest > 100);
  });

  const scaleX = scrolledEnough && scrollDirection === "down" ? 0.75 : 1;
  const translateY = scrolledEnough && scrollDirection === "down" ? "5vh" : "0vh";
  const roundedClass = scrolledEnough && scrollDirection === "down" ? "rounded-2xl" : "";

  return (
    <motion.div
      style={{ scaleX, y: translateY }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 origin-center transition-all duration-300 ease-in-out",
        "backdrop-blur-md bg-black/20 border-b border-white/10",
        roundedClass, // <-- aquí se agrega el borde redondeado
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, {
              visible: scrolledEnough,
            })
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        padding: visible ? "0.5rem 1rem" : "1.5rem 2rem",
        backdropFilter: visible ? "blur(20px)" : "none",
        y: visible ? 0 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      className={cn(
        "relative z-50 mx-auto hidden w-full max-w-7xl items-center justify-between lg:flex",
        // Glassmorphism aquí también
        "backdrop-blur-md bg-black/20 border-b border-white/10 shadow-lg",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className={cn("flex items-center space-x-6", className)}>
      {items.map((item, idx) => (
        <a
          key={idx}
          href={item.link}
          onClick={onItemClick}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
          className="relative px-2 py-1 transition-colors"
        >
          {item.name}
          {hovered === idx && (
            <motion.span
              layoutId="underline"
              className="absolute bottom-0 left-0 h-0.5 w-full bg-[#EDF252]"
            />
          )}
        </a>
      ))}
    </div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(20px)" : "none",
        y: visible ? 0 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      className={cn(
        "relative z-50 mx-auto flex w-full flex-col items-center justify-between lg:hidden",
        // Glassmorphism aquí también
        "backdrop-blur-md bg-black/20 border-b border-white/10 shadow-lg",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => (
  <div className={cn("flex w-full items-center justify-between", className)}>{children}</div>
);

export const MobileNavMenu = ({ children, className, isOpen }: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col gap-4 px-4 py-6",

            "backdrop-blur-md bg-black/40 border border-white/10 shadow-lg",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-white dark:text-white" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-white dark:text-white" onClick={onClick} />
  );
};

export const NavbarLogo = ({
  src = "/logo.svg",
  alt = "Logo",
  name = "Omegon",
}: {
  src?: string;
  alt?: string;
  name?: string;
}) => (
  <a href="#" className="flex items-center space-x-2">
    <img src={src} alt={alt} width={32} height={32} />
    <span className="text-lg font-semibold text-white">{name}</span>
  </a>
);

export const NavbarButton = ({
  as = "a",
  href,
  children,
  className,
  variant = "primary",
  ...props
}: {
  as?: "a" | "button";
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const baseStyles =
    "px-4 py-2 rounded-md text-sm font-bold inline-block text-center transition";
  const variantStyles = {
    primary: "bg-[#EDF252] text-black hover:bg-[#f9fa6d]",
    secondary: "bg-white text-black hover:bg-zinc-100",
    dark: "bg-black text-white",
    gradient: "bg-gradient-to-b from-blue-500 to-blue-700 text-white",
  };

  if (as === "button") {
    return (
      <button
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </a>
  );
};
