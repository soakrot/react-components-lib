import "./Select.css";
export type SelectOption = {
    label: string;
    value: string;
};
interface SelectProps {
    className?: string;
    options: SelectOption[];
    value: string;
    onChange: (option: string) => void;
}
declare function Select({ className, options, value, onChange }: SelectProps): import("react/jsx-runtime").JSX.Element;
export default Select;
