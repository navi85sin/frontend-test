import * as React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mount } from "enzyme";
import { render, screen } from "@testing-library/react";
import Autocomplete from "./Autocomplete";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("./utils/api");

describe("Autocomplete", () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<Autocomplete />);
    const input = screen.getByRole("textbox", {
      placeholder: /search for a product/i,
    });
    expect(input).toBeInTheDocument();
  });

  it("input text box is empty, Autocomplete List is empty", () => {
    const wrapper = mount(<Autocomplete />);
    const input = wrapper.find(".search-box");
    expect(input.get(0).props.value).toEqual("");
    expect(wrapper.find(".suggestionsList").exists()).toBeTruthy();
    expect(wrapper.find(".suggestionsList").children().exists()).toBe(false);
  });

  it("Search box text gets updated", () => {
    const wrapper = mount(<Autocomplete />);
    wrapper
      .find(".search-box")
      .simulate("change", { target: { value: "Men" } });
    wrapper.update();
    expect(wrapper.find(".search-box").props().value).toEqual("Men");
  });
});
