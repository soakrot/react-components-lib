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
  tags: ["autodocs"],
};

type Story = StoryObj<typeof Carousel>;

const items = new Array(3).fill(null).map((_, i) => (
  <div className={`slider ${i === 1 ? "slider--dark" : ""}`}>
    <h1>Slider {i + 1}</h1>
  </div>
));

const Default: Story = {
  args: {
    autoPlay: {
      auto: true,
    },
  },
  render: (args) => {
    return <Carousel {...args} className="default-story" items={items} />;
  },
};

const FadeIn: Story = {
  render() {
    return (
      <Carousel className="default-story" animationType="fade" items={items} />
    );
  },
};

const Vertical: Story = {
  render: () => {
    return (
      <Carousel className="vertical-story" direction="vertical" items={items} />
    );
  },
};

const Indicator: Story = {
  render() {
    return (
      <Carousel className="default-story" items={items} type="indicator" />
    );
  },
};

const IndicatorAndControls: Story = {
  render() {
    return <Carousel className="default-story" items={items} type="both" />;
  },
};

const WithCustomIndicators: Story = {
  render() {
    const items = [<h1>Slider 1</h1>, <h1>Slider 2</h1>, <h1>Slider 3</h1>];
    return <Carousel items={items} Indicator={CustomIndicator} />;
  },
};

const ImagesCarousel: Story = {
  render: () => {
    const items = [
      <Image src={img1} alt="image of space" />,
      <Image src={img2} alt="image of space" />,
      <Image src={img3} alt="image of space" />,
    ];
    return <Carousel items={items} />;
  },
};

export default meta;
export {
  Default,
  FadeIn,
  Vertical,
  Indicator,
  IndicatorAndControls,
  ImagesCarousel,
  WithCustomIndicators,
};
