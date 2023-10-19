type Props = { content: string; className?: string };

export default function MarkdownParser({
  content,
  className,
}: Props): JSX.Element {
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
  );
}
