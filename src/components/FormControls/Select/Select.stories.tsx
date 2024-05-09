import type { Meta, StoryObj } from "@storybook/react";
import Select from "./Select";
import { useState } from "react";

const meta: Meta<typeof Select> = {
  title: "Form Controls/Select",
  component: Select,
};
export default meta;

type Story = StoryObj<typeof Select>;

const options = [
  { label: "Jan", value: "jan" },
  { label: "Feb", value: "feb" },
  { label: "Mar", value: "mar" },
  { label: "Apr", value: "apr" },
  { label: "May", value: "may" },
];
export const Default: Story = {
  args: {
    label: "Month",
  },
  render: (args) => {
    const [value, setValue] = useState(options[0].label);
    return (
      <Select
        disabled={args.disabled}
        value={value}
        label={args.label}
        required={args.required}
        options={options}
        onChange={setValue}
      />
    );
  },
};

export const Disabled: Story = {};
