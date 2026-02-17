declare module "lucide-react" {
  import * as React from "react";

  export interface IconProps extends React.SVGProps<SVGSVGElement> {
    color?: string;
    size?: string | number;
    strokeWidth?: string | number;
    absoluteStrokeWidth?: boolean;
  }

  export type Icon = React.FC<IconProps>;

  export const Ban: Icon;
  export const LoaderCircleIcon: Icon;
  export const Eye: Icon;
  export const EyeOff: Icon;
  export const Dot: Icon;
  export const HomeIcon: Icon;
  export const AlertTriangleIcon: Icon;
  export const MenuIcon: Icon;
  export const X: Icon;
  export const Loader: Icon;
  export const Calendar: Icon;
  export const Check: Icon;
  export const ChevronUp: Icon;
  export const ChevronDown: Icon;
  export const ChevronLeft: Icon;
  export const ChevronRight: Icon;
  export const Activity: Icon;
  export const Airplay: Icon;
  export const AlertCircle: Icon;
  export const AlertOctagon: Icon;
  export const AlertTriangle: Icon;
  export const AlignCenter: Icon;
  export const AlignJustify: Icon;
  export const AlignLeft: Icon;
  export const AlignRight: Icon;
  export const Anchor: Icon;
  export const Aperture: Icon;
  export const Archive: Icon;
  export const ArrowDown: Icon;
  export const ArrowLeft: Icon;
  export const ArrowRight: Icon;
  export const ArrowUp: Icon;
}
