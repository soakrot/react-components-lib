import type { StoryObj, Meta } from "@storybook/react";
import Switch from "./Switch";
import { useState } from "react";

const meta: Meta<typeof Switch> = {
  title: "Form Controls/Switch",
  component: Switch,
  decorators: [
    (Story, { args }) => {
      const [isChecked, setIsChecked] = useState(false);
      const handleOnChange = () => {
        setIsChecked((prev) => !prev);
      };
      args.checked = isChecked;
      args.onChange = handleOnChange;

      return <Story />;
    },
  ],
};

type Story = StoryObj<typeof Switch>;

const Default: Story = {
  render(args) {
    return (
      <Switch
        id="switch"
        checked={args.checked}
        label="check yearly billing"
        onChange={args.onChange}
      />
    );
  },
};

export default meta;
export { Default };
