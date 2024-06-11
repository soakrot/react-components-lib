import { Meta, StoryObj } from "@storybook/react";
import Spinner from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "UI/Spinner",
  component: Spinner,
};

export default meta;

type Story = StoryObj<typeof Spinner>;

const Default: Story = {
  render() {
    return <Spinner />;
  },
};

export { Default };
