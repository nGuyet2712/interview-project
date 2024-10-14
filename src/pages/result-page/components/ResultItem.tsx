interface ResultItemProps {
  item: {
    DocumentId: string;
    DocumentTitle: {
      Text: string;
      Highlights: { BeginOffset: number; EndOffset: number }[];
    };
    DocumentExcerpt: {
      Text: string;
      Highlights: { BeginOffset: number; EndOffset: number }[];
    };
    DocumentURI: string;
  };
}

const highlightText = (
  text: string,
  highlights: { BeginOffset: number; EndOffset: number }[]
) => {
  if (!highlights || highlights.length === 0) return text;

  const highlightedText = [];
  let lastIndex = 0;

  highlights.forEach((highlight) => {
    highlightedText.push(text.substring(lastIndex, highlight.BeginOffset));

    highlightedText.push(
      <span
        key={`${highlight.BeginOffset}-${highlight.EndOffset}`}
        className="font-bold"
      >
        {text.substring(highlight.BeginOffset, highlight.EndOffset)}
      </span>
    );

    lastIndex = highlight.EndOffset;
  });

  highlightedText.push(text.substring(lastIndex));

  return highlightedText;
};

const ResultItem = ({ item }: ResultItemProps) => {
  return (
    <div className="my-10">
      <h3 className="text-[22px] font-semibold text-[#1C76D5]">
        {highlightText(item.DocumentTitle.Text, item.DocumentTitle.Highlights)}
      </h3>

      <p className="my-3">
        {highlightText(
          item.DocumentExcerpt.Text,
          item.DocumentExcerpt.Highlights
        )}
      </p>

      <a
        href={item.DocumentURI}
        target="_blank"
        className="text-sm text-[#686868]"
      >
        https://services.life.gov.sg/government-services/buy-hdb/
      </a>
    </div>
  );
};

export default ResultItem;
