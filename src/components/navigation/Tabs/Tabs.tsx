import { useState } from "react";
import classes from "./Tabs.module.css";

type Tab = {
  title: string;
  content: JSX.Element | string;
};

interface TabsProps {
  className?: string;
  tabs: Tab[];
  onTabChange: (dest: string) => void;
}

function Tabs({ tabs, className, onTabChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  function handleOnTabClick(index: number) {
    setActiveTab(index);
    onTabChange(tabs[index].title);
  }

  return (
    <div className={`${classes.tabsContainer} ${className ? className : ""}`}>
      <ul className={classes.tabs}>
        {tabs.map((tab, i) => (
          <li
            key={i}
            className={`${classes.tab} ${
              i === activeTab ? classes.active : ""
            }`}
          >
            <button onClick={() => handleOnTabClick(i)}>{tab.title}</button>
          </li>
        ))}
      </ul>
      <div className={`${classes.tabContent}`}>{tabs[activeTab].content}</div>
    </div>
  );
}

export default Tabs;
