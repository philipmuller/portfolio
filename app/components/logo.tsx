import { CSSProperties, forwardRef, Ref } from "react";
import { motion } from "framer-motion";

interface Props {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

const Logo = forwardRef<SVGSVGElement, Props>(
  (props, ref: Ref<SVGSVGElement>) => {
    const { size, className, style } = props;
    return (
      <svg
        ref={ref}
        width={size ?? "260"}
        height={size ?? "260"}
        viewBox="0 0 217 217"
        className={className}
        style={style}
      >
        <path d="M108.5 175.555C71.4675 175.555 41.4446 145.532 41.4446 108.5C41.4446 71.4675 71.4675 41.4446 108.5 41.4446C145.532 41.4446 175.555 71.4675 175.555 108.5C175.555 145.532 145.532 175.555 108.5 175.555ZM108.5 0C48.5793 0 0 48.5793 0 108.5L0 217L108.5 217C168.421 217 217 168.421 217 108.5C217 48.5793 168.421 0 108.5 0Z" />
      </svg>
    );
  },
);

Logo.displayName = "Logo";

export const MotionLogo = motion(Logo);
