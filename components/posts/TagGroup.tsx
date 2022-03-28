import clsx from "clsx";

type TagGroupProps = {
  tags: string[];
  className?: string;
};

export default function TagGroup({
  tags,
  className,
}: TagGroupProps): JSX.Element {
  return (
    <div className={clsx("bulma-tags", className)}>
      {tags.sort().map((tag) => (
        <span key={tag} className="bulma-tag">
          {tag}
        </span>
      ))}
    </div>
  );
}
