import type { StoryObj, Meta } from "@storybook/react";
import Col from "./Col";

const meta: Meta<typeof Col> = {
  title: "Layouts/Col",
  component: Col,
};

type Story = StoryObj<typeof Col>;

const Default: Story = {
  render() {
    return (
      <Col>
        <p>Container</p>
      </Col>
    );
  },
};

export default meta;
export { Default };
