import * as React from "react";
import { render, screen, waitFor, fireEvent, getByText } from "@testing-library/react";
//import userEvent from '@testing-library/user-event'
//import { renderHook, act } from "@testing-library/react-hooks";
import {act} from 'react-dom/test-utils';
import Autocomplete from "./Autocomplete";
//import { fetchSuggestions } from "./utils/api";
 //jest.mock("./utils/api");
 
//import { fetchSuggestions } from "./utils/api";


describe("Autocomplete", () => {
  beforeEach(() => {
    //jest.useFakeTimers()
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("render the input button",  async () => {
    let clic = jest.fn();
    const {getByText, getByPlaceholderText, getAllByTestId} = render(<Autocomplete getProductID ={clic} />);
    const input = screen.getByPlaceholderText('Search for a product');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('');
    fireEvent.change(input, { target: { value: 'men' } });
    // check if text of input button is updated
    expect(input.value).toBe('men');
    expect(clic.mock.calls.length).toBe(0);
    await waitFor(() => {
     // await ( async() => {
        const li = screen.getByText('Mens Cotton Jacket');      
      })

		//})
    //screen.debug(api);
    // click the list item
    fireEvent.click(screen.getByText('Mens Cotton Jacket'));
    // check if props function getProductID is being called or not
    expect(clic.mock.calls.length).toBe(1);
    expect(input.value).toBe('');
  });
  
  // using the mock API 
  /*
  it("render the input button",  async () => {
     
   let data  = [
     {
    "id": 2,
    "title": "Mens Casual Premium Slim Fit T-Shirts "
      },
      {
        "id": 3,
        "title": "Mens Cotton Jacket"
      }
    ];
    fetchSuggestions.mockResolvedValue({data});

    let clic = jest.fn();
    
    const {getByText, getByPlaceholderText, getAllByTestId} = render(<Autocomplete getProductID ={clic} />);

    const input = screen.getByPlaceholderText('Search for a product');
    
    //act(() => jest.advanceTimersByTime(1000));
    //await act( async () => {
      act(() => {
      fireEvent.change(input, { target: { value: 'men' } });
     });
      //fireEvent.click(screen.getByText('Mens Cotton Jacket'));
      // expect(input.value).toBe('');

      screen.debug();

      });
*/

   
});
