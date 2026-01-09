type SortType = "LATEST" | "VIEWS";

interface Props {
  value: SortType;
  onChange: (v: SortType) => void;
}

export function ReviewSortSelector({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortType)}
      style={{
        padding: "6px 10px",
        borderRadius: 8,
        border: "1px solid #ddd",
        fontSize: 14,
      }}
    >
      <option value="LATEST">최신순</option>
      <option value="VIEWS">조회수순</option>
    </select>
  );
}
