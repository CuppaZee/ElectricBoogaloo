import { useState } from "react";

export default function useSearch (timeout: number): [string, string, (x: string)=>void] {
  var [value,setValue] = useState('');
  var [search,setSearch] = useState('');
  var [timeoutC,setTimeoutC] = useState<NodeJS.Timeout | null>(null);
  function onValue(val: string) {
    if(timeoutC) clearTimeout(timeoutC)
    setValue(val);
    setTimeoutC(setTimeout(() => {
      return setSearch(val);
    }, timeout))
  };
  return [value, search, onValue];
}