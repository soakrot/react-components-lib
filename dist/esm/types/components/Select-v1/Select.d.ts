import "./Select.css";
type SelectOption = {
    label: string;
    value: string;
};
interface SelectProps {
    options: SelectOption[];
    value?: SelectOption;
    onChange: (value: SelectOption | undefined) => void;
}
declare function Select({ options, value, onChange }: SelectProps): import("react/jsx-runtime").JSX.Element;
export default Select;
