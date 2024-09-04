import type { StoryObj, Meta } from "@storybook/react";
import "./Row.stories.css";
import Container from "../Container";
import Row from "./Row";
import Col from "../Col";

const meta: Meta<typeof Row> = {
  title: "Layouts/Row",
  component: Row,
};

type Story = StoryObj<typeof Row>;

const Default: Story = {
  render() {
    return (
      <Container className="default-story">
        <Row>
          <Col>
            <p>Col 1</p>
          </Col>
          <Col>
            <p>Col 2</p>
          </Col>
        </Row>
      </Container>
    );
  },
};

export default meta;
export { Default };
