import type { Meta, StoryObj } from "@storybook/react";
import Select from "./Select";
import { useState } from "react";

const options = [
  { label: "Jan", value: "jan" },
  { label: "Feb", value: "feb" },
  { label: "Mar", value: "mar" },
  { label: "Apr", value: "apr" },
  { label: "May", value: "may" },
];

const meta: Meta<typeof Select> = {
  title: "Form Controls/Select",
  component: Select,
  decorators: [
    (Story, { args }) => {
      const [value, setValue] = useState("jan");
      args.value = value;
      args.onChange = setValue;
      return <Story />;
    },
  ],
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: "Month",
  },
  render: (args) => {
    return (
      <Select
        disabled={args.disabled}
        value={args.value}
        label={args.label}
        required={args.required}
        options={options}
        onChange={args.onChange}
      />
    );
  },
};

export const Disabled: Story = {
  render(args) {
    return (
      <Select
        disabled={true}
        value={args.value}
        label="month"
        required={args.required}
        options={options}
        onChange={args.onChange}
      />
    );
  },
};
