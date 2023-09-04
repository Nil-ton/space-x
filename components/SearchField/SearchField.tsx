import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/utils";
import React from "react";

export function SearchField({
  search,
  onChange,
  setQuery,
  value,
  id,
  setPage
}: SearchFieldProps) {
  const regex = new RegExp(`^${value}`, "i");
  const filter = search.filter((item) => {
    if (typeof item.name === "string") {
      return item.name.match(regex);
    }
    return false;
  });

  const handleClickDebounced = debounce((item) => {
    if (item.name === 'sucesso') {
      setQuery({ name: 'true', type: 'success' });
    } else if (item.name === 'falha') {
      setQuery({ name: 'false', type: 'success' });
    } else {
      setQuery(item);
    }
    setPage(1)
  }, 300)

  const [isFocus, setIsFocus] = React.useState(false);
  return (
    <div className="relative">
      <Input
        id={id}
        className="w-full"
        placeholder="Pesquise por missão, foguete e resultados"
        onChange={onChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          setTimeout(() => {
            setIsFocus(false)
          },250)
        }}
      />
      {value !== "" && isFocus && (
        <div className="absolute w-full max-h-96 overflow-auto border border-zinc-600 bg-zinc-900">
          {filter.map((item, i) => (
            <div
              key={item.name + i}
              className="flex justify-between p-5 cursor-pointer hover:bg-zinc-600"
              onClick={() => handleClickDebounced(item)}
            >
              <span>{item.name}</span>
              <span>Search by {item.type === 'success' ? 'Result' : item.type}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
