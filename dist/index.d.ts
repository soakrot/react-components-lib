/// <reference types="react" />
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { RefObject } from 'react';

type SelectOption = {
    label: string;
    value: string;
};
interface SelectProps {
    className?: string;
    options: SelectOption[];
    value: string;
    disabled?: boolean;
    onChange: (option: string) => void;
}
declare function Select({ className, options, value, disabled, onChange, }: SelectProps): react_jsx_runtime.JSX.Element;

declare function useOpenMenu<T extends Element>(menuElement: RefObject<T>): {
    isOpen: boolean;
    setIsOpen: react.Dispatch<react.SetStateAction<boolean>>;
};

type UseRoveFocus<T> = {
    container: HTMLElement | T;
    items: HTMLElement[];
    onEnterPress?: () => void;
    onEscapePress?: () => void;
};
declare function useRoveFocus<T extends HTMLElement>({ container, items, onEnterPress, onEscapePress, }: UseRoveFocus<T>): {
    currentFocus: number;
    isKeyboardActive: boolean;
    setCurrentFocus: react.Dispatch<react.SetStateAction<number>>;
    setIsKeyboardActive: react.Dispatch<react.SetStateAction<boolean>>;
};

export { Select, useOpenMenu, useRoveFocus };
