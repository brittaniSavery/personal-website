import React from "react";
import emojiDefinitions from "../lib/emoji-definitions";

type EmojiProps = {
  name: string;
};

export default function Emoji({ name }: EmojiProps): JSX.Element {
  return <span className="iconify" data-icon={emojiDefinitions[name]} />;
}
