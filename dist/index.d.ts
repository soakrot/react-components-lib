import * as react_jsx_runtime from 'react/jsx-runtime';

type SelectOption = {
    label: string;
    value: string;
};
interface SelectProps {
    className?: string;
    options: SelectOption[];
    value: string;
    onChange: (option: string) => void;
}
declare function Select({ className, options, value, onChange }: SelectProps): react_jsx_runtime.JSX.Element;

export { Select };
