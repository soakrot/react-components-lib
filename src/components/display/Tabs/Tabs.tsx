import { useRef, useState } from "react";
import "./Tabs.css";
import { useRovingFocus } from "../../../hooks";
import { Button } from "../../UI";

export type Tab = {
  title: string;
  content: JSX.Element | string;
};

interface TabsProps {
  className?: string;
  tabs: Tab[];
  onTabChange?: (title: string) => void;
}

function Tabs({ tabs, className, onTabChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef<HTMLButtonElement[]>([]);
  const { currentFocus, handleOnKeybrPress } = useRovingFocus<HTMLUListElement>(
    tabsRef,
    handleOnEnterPress
  );

  function handleOnTabClick(index: number) {
    setActiveTab(index);
    onTabChange && onTabChange(tabs[index].title);
  }

  function handleOnEnterPress() {
    setActiveTab(activeTab);
  }

  return (
    <div className={`tabs-container ${className ? className : ""}`}>
      <ul
        className="tabs"
        role="tablist"
        tabIndex={0}
        onKeyDown={handleOnKeybrPress}
      >
        {tabs.map((tab, i) => (
          <li key={i} role="presentation">
            <Button
              id={`tab-${i + 1}`}
              className={`tab ${i === activeTab ? "active" : ""}`}
              role="tab"
              ref={(el: HTMLButtonElement) => (tabsRef.current[i] = el)}
              tabIndex={currentFocus === i ? 0 : -1}
              aria-selected={currentFocus === i}
              aria-controls={`tabpanel-${i + 1}`}
              onClick={() => handleOnTabClick(i)}
            >
              {tab.title}
            </Button>
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {tabs.map((tab, i) => (
          <div
            id={`tabpanel-${i + 1}`}
            className={`tabpanel ${activeTab === i ? "tabpanel-active" : ""}`}
            role="tabpanel"
            aria-labelledby={`tab-${i + 1}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
