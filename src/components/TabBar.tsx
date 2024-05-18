"use client";

import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({
  tabOptions = [1, 2, 3, 4, 5],
  currentTab = 1,
}: Props) => {

  
  const [selected, setSelected] = useState(currentTab);
  const router = useRouter();
  
  if (currentTab > tabOptions.length) {
    console.error(
      `Current tab ${currentTab} is greater than the number of tabs ${tabOptions.length}`
    );
    setSelected(1);
  }

  const handleTabChange = (tab: number) => {
    setSelected(tab);
    setCookie("currentTab", tab.toString());
    router.refresh();
  };

  return (
    <div
      className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2 grid-cols-5`}>
      
      {
      tabOptions.map((tab) => (
        <div key={tab}>
          <input type="radio" id={tab.toString()} className="peer hidden" checked={tab === selected} onChange={()=>{}}/>
          <label
            onClick={() => handleTabChange(tab)}
            className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
