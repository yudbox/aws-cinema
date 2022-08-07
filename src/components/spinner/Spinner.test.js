import React from "react";
import { render } from "@testing-library/react";

import Spinner from "./Spinner";

describe("Spinner", () => {
  test("display spinner", () => {
    const { getByTestId } = render(<Spinner />);
    const elem = getByTestId("spinnerIdWord");
    expect(elem).toBeInTheDocument();
  });

  test("spinner contains 3 elements", () => {
    const { getByTestId } = render(<Spinner />);
    const elem = getByTestId("spinnerIdWord");
    expect(elem.children.length).toBe(3);
  });
});
