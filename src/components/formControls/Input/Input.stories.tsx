import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";
import { useInput } from "../../../hooks";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Form Controls/Input",
};

export default meta;
type Story = StoryObj<typeof Input>;

const Default: Story = {
  render() {
    const {
      value: nameInput,
      hasError,
      handleChangeInput,
      handleBlurInput,
    } = useInput(validateInput);

    function validateInput(input: string) {
      return input.trim().length > 0;
    }

    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          id="name-input"
          name="name-input"
          label="Name"
          value={nameInput}
          isValid={hasError}
          placeholder="e.g. Omar"
          onBlur={handleBlurInput}
          onChange={handleChangeInput}
          pattern="[A-Za-z\s]+"
          minLength={3}
          maxLength={26}
          required={hasError}
          aria-required={true}
        />
        <button>Submit</button>
      </form>
    );
  },
};

export { Default };
