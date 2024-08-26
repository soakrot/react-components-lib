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

// This tells Typescript that the wrapped component is getting its
// expected props
type WithValidationProps = {
  isValid: boolean;
};
function withValidation<T extends WithValidationProps>(
  WrappedComponent: ComponentType<T>
) {
  return (props: Omit<T, keyof WithValidationProps>) => {
    const { value, hasError, handleChangeInput, handleBlurInput } =
      useInput(validateInput);

    function validateInput(input: string) {
      return input.trim().length > 0;
    }

    return (
      <WrappedComponent
        {...(props as T)}
        value={value}
        isValid={hasError}
        onChange={handleChangeInput}
        onBlur={handleBlurInput}
      />
    );
  };
}

const InputWithValidation = withValidation(Input);
const Default: Story = {
  render() {
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <InputWithValidation
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
        <InputWithValidation
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
