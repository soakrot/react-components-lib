import type { StoryObj, Meta } from "@storybook/react";
import Nav from "./Nav";

const meta: Meta<typeof Nav> = {
  title: "Navigation/Nav",
  component: Nav,
};

type Story = StoryObj<typeof Nav>;

const items = [
  <a href="/">Home</a>,
  <a href="/">Proudects</a>,
  <a href="/">Contact</a>,
  <a href="/">About us</a>,
];

const Default: Story = {
  render() {
    return <Nav items={items} />;
  },
};

export { Default };
export default meta;
