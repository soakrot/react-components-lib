import type { Meta, StoryObj } from "@storybook/react";
import "./Carousel.stories.css";
import Carousel from "./Carousel";
import img1 from "/assets/space-1.jpg";
import img2 from "/assets/space-2.jpg";
import img3 from "/assets/space-3.jpg";
import CustomIndicator from "./CustomIndicator";
import { Image } from "../../media";

const meta: Meta<typeof Carousel> = {
  title: "Display/Carousel",
  component: Carousel,
};

type Story = StoryObj<typeof Carousel>;

const ImagesSlider: Story = {
  render: () => {
    const items = [
      <Image src={img1} alt="image of space" />,
      <Image src={img2} alt="image of space" />,
      <Image src={img3} alt="image of space" />,
    ];
    return <Carousel items={items} />;
  },
};

const Default: Story = {
  render: () => {
    const items = [<h1>Slider 1</h1>, <h1>Slider 2</h1>, <h1>Slider 3</h1>];
    return <Carousel className="default-story" items={items} />;
  },
};

const WithCustomIndicators: Story = {
  render() {
    const items = [<h1>Slider 1</h1>, <h1>Slider 2</h1>, <h1>Slider 3</h1>];
    return <Carousel items={items} Indicator={CustomIndicator} />;
  },
};

export default meta;
export { ImagesSlider, Default, WithCustomIndicators };
