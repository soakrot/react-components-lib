import { KeyboardEvent, MutableRefObject } from "react";
declare function useHandleSelectNav(optionsRef: MutableRefObject<HTMLButtonElement[]>): ((e: KeyboardEvent, handleEnterKey: (optionValue: string) => void, handleEscapeKey: () => void) => void)[];
export default useHandleSelectNav;
