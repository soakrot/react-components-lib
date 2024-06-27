import { screen, renderHook } from "@testing-library/react";
import { setup } from "../../../utils/test-utils";
import Select from "./Select";
import type { SelectOption } from "./Select";
import { useState } from "react";

describe("Select component", () => {
  const options: SelectOption[] = [
    { label: "Cat", value: "cat" },
    { label: "Dog", value: "dog" },
  ];
  const [selectValue, setSelectValue] = renderHook(() => useState("cat")).result
    .current;
  function handleOnSelectChange(value: string) {
    setSelectValue(value);
  }

  const { user } = setup(
    <Select
      options={options}
      value={selectValue}
      onChange={handleOnSelectChange}
    />
  );
  const selectElement = screen.getByRole("combobox");

  it("renders select", async () => {
    expect(selectElement).toBeInTheDocument();
  });

  it('selects "cat" option', async () => {
    await user.click(selectElement);

    await user.keyboard("[ArrowDown][Enter]");
    expect(selectElement).toHaveTextContent("Cat");
  });
});
