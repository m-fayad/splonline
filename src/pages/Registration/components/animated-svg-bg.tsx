import { useEffect, useState } from "react";

const AnimatedSvgBg = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const transitionStyle =
    "stroke-dashoffset 1s cubic-bezier(0.47, 0, 0.745, 0.715)";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="110.539"
      viewBox="0 0 1922.745 110.539"
      className="w-full absolute top-[30dvh] left-0 right-0 block z-0 overflow-visible"
      preserveAspectRatio="xMidYMid slice"
      style={{ overflow: "visible" }}
    >
      <g id="lines" transform="translate(240.981 6.003)">
        <g id="Group_5" data-name="Group 5" transform="translate(0.001)">
          {/* Stroke 1 */}
          <path
            id="Stroke_1"
            data-name="Stroke 1"
            d="M481.449,31H40.442c-9.228,0-12.731-3.427-17.011-7.614,0,0-2.6-2.54-6.83-6.776L0,0"
            transform="translate(1199.524 22.804)"
            fill="none"
            stroke="#153c3f"
            strokeMiterlimit="10"
            strokeWidth="12"
            className="svg-hero-1"
            style={{
              strokeDasharray: "495.4066467285156px",
              strokeDashoffset: loaded ? 0 : "495.4066467285156px",
              transition: `${transitionStyle} 0s`,
            }}
          />
          {/* Stroke 5 (Renamed to 2 for clarity in sequence) */}
          <path
            id="Stroke_5"
            data-name="Stroke 5"
            d="M1199.525,22.8,1179.014,2.286a9.393,9.393,0,0,0-13.2.888L1114.988,54c-4.235,4.236-12.6,7.7-18.588,7.7L16.047,61.5H-240.981"
            transform="translate(-0.001 0)"
            fill="none"
            stroke="#153c3f"
            strokeMiterlimit="10"
            strokeWidth="12"
            className="svg-hero-2"
            style={{
              strokeDasharray: "1475.483642578125px",
              strokeDashoffset: loaded ? 0 : "1475.483642578125px",
              transition: `${transitionStyle} 0.12s`,
            }}
          />
        </g>
        {/* Stroke 3 */}
        <path
          id="Stroke_3"
          data-name="Stroke 3"
          d="M1681.764,0H1245.2c-5.2,0-7.724,1.33-10.369,3.975L1162.864,74,1105.8,27.31l-1346.711-.455"
          transform="translate(0 22.5)"
          fill="none"
          stroke="#00c8e1"
          strokeMiterlimit="10"
          strokeWidth="12"
          className="svg-hero-3"
          style={{
            strokeDasharray: "1970.888671875px",
            strokeDashoffset: loaded ? 0 : "1970.888671875px",
            transition: `${transitionStyle} 0.24s`,
          }}
        />
      </g>
    </svg>
  );
};

export default AnimatedSvgBg;
