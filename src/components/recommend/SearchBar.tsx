import { SearchInput } from "../../styles/recommend/SearchBar.styles";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <SearchInput
      placeholder="지역 또는 장소 검색"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
