/// <reference types="react" />
type UseRoveFocus<T> = {
    container: HTMLElement | T;
    items: HTMLElement[];
    onEnterPress?: () => void;
    onEscapePress?: () => void;
};
declare function useRoveFocus<T extends HTMLElement>({ container, items, onEnterPress, onEscapePress, }: UseRoveFocus<T>): {
    currentFocus: number;
    isKeyboardActive: boolean;
    setCurrentFocus: import("react").Dispatch<import("react").SetStateAction<number>>;
    setIsKeyboardActive: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
export default useRoveFocus;
