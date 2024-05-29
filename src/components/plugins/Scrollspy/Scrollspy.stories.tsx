import type { Meta, StoryObj } from "@storybook/react";
import Scrollspy from "./Scrollspy";
import { useRef } from "react";
import classes from "./Scrollspy.module.css";

// Metadata of the component
const meta: Meta<typeof Scrollspy> = {
  title: "Plugins/Scrollspy",
  component: Scrollspy,
};
export default meta;

type Story = StoryObj<typeof Scrollspy>;

const FirstStory: Story = {
  render: () => {
    const navRef = useRef<HTMLElement>(null);
    const headingRefs = useRef<HTMLHeadingElement[]>([]);
    const options = {
      threshold: 0.2,
      rootMargin: "-50px",
    };

    function pushRef(el: HTMLHeadingElement) {
      headingRefs.current.push(el);
    }

    return (
      <div>
        <nav ref={navRef}>
          <ul>
            <li>
              <a href="#heading1" data-scrollspy-target="heading1">
                Heading 1
              </a>
            </li>
            <li>
              <a href="#heading2" data-scrollspy-target="heading2">
                Heading 2
              </a>
            </li>
          </ul>
        </nav>
        <Scrollspy
          activeClass="active"
          target={navRef}
          obsOptions={options}
          observeTarget={headingRefs}
        >
          <div className={classes["test-box"]}>
            <h1 id="heading1" ref={pushRef}>
              First Heading
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab,
              fugit! Libero, quia tempora voluptas enim cumque facilis illum
              incidunt et, sint, minima asperiores quibusdam totam perferendis.
              Doloremque temporibus doloribus voluptatem. Maxime neque corrupti
              veniam. Magnam reprehenderit iusto harum. Mollitia, reiciendis,
              quam vitae repellat omnis a sint deleniti architecto esse possimus
              similique sed libero aliquam odit quis quibusdam sit doloribus
              molestias.
            </p>
            <h1 id="heading2" ref={pushRef}>
              Second Heading
            </h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat
              architecto quidem unde voluptas rerum! Quam, animi nemo adipisci
              cum in cumque, earum deserunt, enim pariatur inventore dolor
              soluta atque rem. Eveniet atque aliquid minus sit dolores soluta
              facilis exercitationem ullam ratione. Error dolor temporibus, sed
              sit id delectus exercitationem ut voluptas veritatis perferendis
              ducimus, corrupti, incidunt inventore facilis corporis modi. Ex
              quam officiis doloribus consequatur iure cum aperiam perferendis
              dolores. Ad maxime dicta sint, ipsam aut minima totam porro libero
              dignissimos accusantium incidunt eligendi perferendis illo.
              Reprehenderit, aperiam? Porro, tenetur.
            </p>
          </div>
        </Scrollspy>
      </div>
    );
  },
};

export { FirstStory };
