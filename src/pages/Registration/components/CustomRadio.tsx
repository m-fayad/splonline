import { Radio, RadioProps, styled } from "@mui/material";

const BpIcon = styled("span")(() => ({
  borderRadius: "50%",
  width: "1.15em",
  height: "1.15em",
  backgroundColor: "#fff",
  border: "1px solid rgba(0, 0, 0, .25)",
  marginRight: "0.25rem",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#136e82",
  borderColor: "#136e82",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "contain",
  "&:before": {
    display: "block",
    width: "1.15em",
    height: "1.15em",
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#105e70",
  },
});

// The SVG provided by user: <circle r='2' fill='%23fff'/> which is white.
// So the background of the checked radio must be dark/colored.
// Using #136e82 (Teal) as consistent with app theme.

export default function CustomRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}
