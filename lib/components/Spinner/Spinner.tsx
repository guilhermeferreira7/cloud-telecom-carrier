import {
  SpinnerProps as SpinnerPropsBS,
  Spinner as SpinnerBS,
} from "react-bootstrap";

type SpinnerProps = {
  text?: string;
  textLeft?: boolean;
} & SpinnerPropsBS;

export function Spinner({ text, textLeft, ...props }: SpinnerProps) {
  return (
    <span
      className={`d-inline-flex gap-2 fs-6 ms-3 text-nowrap text-${props.color}`}
    >
      {text && textLeft && <Text text={text} />}

      <SpinnerBS size="sm" {...props} />

      {text && !textLeft && <Text text={text} />}
    </span>
  );
}

function Text({ text }: { text: string }) {
  return <span className="fs-xs">{text}</span>;
}
