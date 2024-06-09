import type { Meta, StoryObj } from "@storybook/react";
import Scrollspy, { obsOptions } from "./Scrollspy";
import "./Scrollspy.stories.css";
import { useRef } from "react";

// Metadata of the component
const meta: Meta<typeof Scrollspy> = {
  title: "Plugins/Scrollspy",
  component: Scrollspy,
};
export default meta;

type Story = StoryObj<typeof Scrollspy>;

const FirstStory: Story = {
  render: () => {
    const sectionsRefs = useRef<HTMLElement[]>([]);
    const options: obsOptions = {
      threshold: 1,
    };
    const sectionsTitles = ["Section one", "Section two", "Section three"];

    function pushRef(el: HTMLElement, i: number) {
      sectionsRefs.current[i] = el;
    }

    return (
      <div>
        <nav>
          <ul>
            <li>
              <a href="#heading1" data-scrollspy-target="section-1">
                Section 1
              </a>
            </li>
            <li>
              <a href="#heading2" data-scrollspy-target="section-2">
                Section 2
              </a>
            </li>
            <li>
              <a href="#heading3" data-scrollspy-target="section-3">
                Section 3
              </a>
            </li>
          </ul>
        </nav>
        <Scrollspy
          activeClass="active"
          obsOptions={options}
          observeTarget={sectionsRefs}
        >
          <div className="test-box">
            {sectionsTitles.map((title, i) => (
              <section
                id={`section-${i + 1}`}
                ref={(el: HTMLElement) => pushRef(el, i)}
              >
                <h1>{title}</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab,
                  fugit! Libero, quia tempora voluptas enim cumque facilis illum
                  incidunt et, sint, minima asperiores quibusdam totam
                  perferendis. Doloremque temporibus doloribus voluptatem.
                  Maxime neque corrupti veniam. Magnam reprehenderit iusto
                  harum. Mollitia, reiciendis, quam vitae repellat omnis a sint
                  deleniti architecto esse possimus similique sed libero aliquam
                  odit quis quibusdam sit doloribus molestias.
                </p>
              </section>
            ))}
          </div>
        </Scrollspy>
      </div>
    );
  },
};

export { FirstStory };
