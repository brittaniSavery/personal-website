type Props = {
  children: string;
  name: string;
  location?: string;
};

export default function ReviewQuote({
  children,
  name,
  location,
}: Props): JSX.Element {
  return (
    <p>
      <span className="is-italic">&quot;{children}&quot;</span>
      <br />
      &mdash;{name} {location ? `(${location})` : ""}
    </p>
  );
}
