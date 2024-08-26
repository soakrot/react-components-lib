import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";
import { useInput } from "../../../hooks";
import { ComponentType } from "react";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Form Controls/Input",
};

export default meta;
type Story = StoryObj<typeof Input>;

function withState<T>(Component: ComponentType<T>) {
  return (props: T) => {
    const { value, hasError, handleChangeInput, handleBlurInput } =
      useInput(validateInput);

    function validateInput(input: string) {
      return input.trim().length > 0;
    }

    return (
      <Component
        {...props}
        value={value}
        isValid={hasError}
        required={hasError}
        onChange={handleChangeInput}
        onBlur={handleBlurInput}
      />
    );
  };
}

const InputWithState = withState(Input);
const Default: Story = {
  render() {
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <InputWithState
          id="name-input"
          name="name-input"
          labels="Name"
          placeholder="e.g. Omar"
          pattern="[A-Za-z\s]+"
          minLength={3}
          maxLength={26}
          aria-required={true}
        />
        <button>Submit</button>
      </form>
    );
  },
};

const WithMultipleLabels: Story = {
  render() {
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <InputWithState
          id="name-input"
          name="name-input"
          labels={[
            { text: "Name", position: "before" },
            { text: "Required", position: "after" },
          ]}
          placeholder="e.g. Omar"
          pattern="[A-Za-z\s]+"
          minLength={3}
          maxLength={26}
          aria-required={true}
        />
        <button>Submit</button>
      </form>
    );
  },
};

export { Default, WithMultipleLabels };
