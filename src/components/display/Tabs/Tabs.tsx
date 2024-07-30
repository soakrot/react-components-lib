import { useEffect, useRef, useState } from "react";
import "./Tabs.css";
import { useRovingFocus } from "../../../hooks";
import { Button } from "../../UI";

export type Tab = {
  title: string;
  content: JSX.Element | string;
};

interface TabsProps {
  tabs: Tab[];
  className?: string;
  tabVariant?: "underline" | "button";
  onTabChange?: (title: string) => void;
}

function Tabs(props: TabsProps) {
  const { tabs, className, tabVariant = "underline", onTabChange } = props;
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef<HTMLButtonElement[]>([]);
  const lineRef = useRef<HTMLSpanElement>(null);
  const { currentFocus, handleOnKeybrPress } = useRovingFocus<HTMLUListElement>(
    tabsRef,
    handleOnEnterPress
  );

  useEffect(() => {
    const activeTabWidth = tabsRef.current[activeTab].offsetWidth;
    const activeTabPos = {
      left: tabsRef.current[activeTab].getBoundingClientRect().left,
    };

    lineRef.current?.style.setProperty("width", activeTabWidth + "px");
    lineRef.current?.style.setProperty("left", activeTabPos.left + "px");
  }, [activeTab]);

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
              className={`tab ${tabVariant === "button" ? "tab-btn" : "tab-underline"} ${i === activeTab ? "active" : ""}`}
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
      {tabVariant === "underline" && (
        <span className="line" ref={lineRef}></span>
      )}
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
