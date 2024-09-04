import type { StoryObj, Meta } from "@storybook/react";
import Container from "./Container";

const meta: Meta<typeof Container> = {
  title: "Layouts/Container",
  component: Container,
};

type Story = StoryObj<typeof Container>;

const Default: Story = {
  args: {
    width: "lg",
  },
  render(args) {
    return (
      <Container {...args}>
        <p>Container</p>
      </Container>
    );
  },
};

export default meta;
export { Default };
