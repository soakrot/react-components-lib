import type { StoryObj, Meta } from "@storybook/react";
import Navbar from "./Navbar";

const meta: Meta<typeof Navbar> = {
  title: "Navigation/Navbar",
  component: Navbar,
  decorators: (story) => <div style={{ padding: "2rem" }}>{story()}</div>,
};

type Story = StoryObj<typeof Navbar>;

const WithMenu: Story = {
  render() {
    return (
      <Navbar>
        <Navbar.MenuToggle />
        <Navbar.Menu>
          <ul>
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
        </Navbar.Menu>
      </Navbar>
    );
  },
};

export { WithMenu };
export default meta;
