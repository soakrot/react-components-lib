import type { Meta, StoryObj } from "@storybook/react";
import Tabs, { Tab } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Display/Tabs",
  component: Tabs,
};

type Story = StoryObj<typeof Tabs>;

const items: Tab[] = [
  {
    title: "Tab one",
    content: (
      <>
        <a href="#">Link</a>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          labore impedit commodi explicabo, iusto itaque consequatur officia
          odio minus excepturi repellendus dolor dicta cupiditate animi expedita
          qui non placeat quidem!
        </p>
      </>
    ),
  },
  {
    title: "Tab two",
    content: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
        expedita autem quam nam culpa. Optio mollitia voluptatum velit possimus,
        rerum, numquam autem dolores officiis adipisci libero sequi id assumenda
        est!
      </p>
    ),
  },
  {
    title: "Tab three",
    content: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel facere
        temporibus aliquid explicabo aperiam veritatis eaque eos debitis nisi.
        Nemo hic quod debitis, officia delectus blanditiis dicta asperiores
        architecto nulla.
      </p>
    ),
  },
];

const Default: Story = {
  render() {
    return <Tabs tabs={items} />;
  },
};

export { Default };
export default meta;
