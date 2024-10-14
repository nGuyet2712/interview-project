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

/*
  Highlight text based on highlights object.
  1. Check if the highlights array is empty or undefined. If it is, the function simply returns the original text without any modifications.
  2. If highlights exist, initialize an empty array `highlightedText` to store the different parts of the final text (both normal and highlighted).
  3. Set a variable `lastIndex` to 0, which keeps track of the current position in the text.
  4. For each highlight object:
     a. Push the non-highlighted part of the text (from `lastIndex` to `BeginOffset`) into the `highlightedText` array.
     b. Push the highlighted portion of the text (from `BeginOffset` to `EndOffset`) wrapped in a `<span>` tag, which applies the class `font-bold` to make the text bold.
     c. Update `lastIndex` to `EndOffset` to mark the end of the current highlighted segment.
  5. After processing all the highlights, push the remaining unhighlighted portion of the text (if any) into the `highlightedText` array.
  6. Return the `highlightedText` array, which contains a mix of plain text and highlighted spans.
*/
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

/**
 * Display a list of search results.
 * @component
 * @param {Object} props.item - The results item.
 * @returns {React.ReactElement} Render the list of results or a loading skeleton.
 */
const ResultItem = ({ item }: ResultItemProps) => {
  return (
    <div className="my-10">
      <a
        href={item.DocumentURI}
        target="_blank"
        className="text-sm text-[#686868]"
      >
        <h3 className="text-[22px] font-semibold text-[#1C76D5] hover:underline">
          {highlightText(
            item.DocumentTitle.Text,
            item.DocumentTitle.Highlights
          )}
        </h3>
      </a>

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
        {item.DocumentURI}
      </a>
    </div>
  );
};

export default ResultItem;
