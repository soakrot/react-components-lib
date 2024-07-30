import type { StoryObj, Meta } from "@storybook/react";
import "./Navbar.stories.css";
import Navbar from "./Navbar";

const meta: Meta<typeof Navbar> = {
  title: "Navigation/Navbar",
  component: Navbar,
  decorators: (story) => <div style={{ padding: "2rem" }}>{story()}</div>,
};

type Story = StoryObj<typeof Navbar>;

const navList = (
  <ul className="nav-list flex">
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/">Proudects</a>
    </li>
    <li>
      <a href="/">Contact</a>
    </li>
    <li>
      <a href="/">About us</a>
    </li>
  </ul>
);

const Default: Story = {
  render() {
    return <Navbar>{navList}</Navbar>;
  },
};

const WithMenu: Story = {
  render() {
    return <Navbar type="collapse">{navList}</Navbar>;
  },
};

export { Default, WithMenu };
export default meta;
