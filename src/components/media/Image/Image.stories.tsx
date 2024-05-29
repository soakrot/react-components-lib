import { Meta, StoryObj } from "@storybook/react";
import Image from "./Image";

const meta: Meta<typeof Image> = {
  title: "media/Image",
  component: Image,
};
export default meta;

type Story = StoryObj<typeof Image>;

export const Default: Story = {
  render() {
    return <Image src="/assets/space-1.jpg" alt="Image of space" />;
  },
};
