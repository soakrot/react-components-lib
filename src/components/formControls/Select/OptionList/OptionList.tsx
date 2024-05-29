import type { SelectOption } from "../Select";
import { MouseEvent, RefObject, forwardRef, useEffect, useRef } from "react";
import { randID } from "../../../../utils/utils";
import "./OptionList.css";
import { Option } from "../Option";

interface OptionListProps {
  currentFocus: number;
  isSelectOpen: boolean;
  options: SelectOption[];
  optionsRef: RefObject<HTMLLIElement[]>;
  onOptionClick: (optVal: string, e: MouseEvent<HTMLLIElement>) => void;
  onOptionHover: (i: number) => void;
}

type Ref = HTMLUListElement;
const OptionList = forwardRef<Ref, OptionListProps>(function (props, ref) {
  const {
    currentFocus,
    isSelectOpen,
    options,
    optionsRef,
    onOptionClick,
    onOptionHover,
  } = props;
  const optionsIDs = useRef<string[]>([]);
  const optionListID = `select-options-${randID()}`;

  useEffect(() => {
    optionsIDs.current = options.map(() => `option-${randID()}`);
  }, []);

  function getActiveOptionID() {
    if (!isSelectOpen) return;
    return optionsIDs.current[currentFocus];
  }

  function pushOptionsRef(el: HTMLLIElement, i: number) {
    if (el && optionsRef.current) {
      optionsRef.current[i] = el;
    }
  }

  return (
    <ul
      className="select__options"
      id={optionListID}
      ref={ref}
      role="listbox"
      aria-activedescendant={getActiveOptionID()}
    >
      {options.map((option, i) => (
        <Option
          ref={(el: HTMLLIElement) => pushOptionsRef(el, i)}
          key={option.value}
          id={optionsIDs.current[i]}
          value={option.value}
          tabIndex={currentFocus === i ? 0 : -1}
          onOptionClick={onOptionClick}
          onOptionHover={() => onOptionHover(i)}
        >
          {option.label}
        </Option>
      ))}
    </ul>
  );
});

export default OptionList;
