import { Heading } from "../catalyst/heading.jsx";
import { Field, Label } from "../catalyst/fieldset.jsx";
import {
  Combobox,
  ComboboxLabel,
  ComboboxOption,
} from "../catalyst/combobox.jsx";
import { Button } from "../catalyst/button.jsx";
import { Select } from "../catalyst/select.jsx";
import { useEffect, useState } from "react";

const SearchForm = ({ item, setItem, quality, setQuality, onSubmit }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("./items.json");
      const data = await res.json();
      setItems(data);
    };

    fetchData();
  }, []);

  return (
    <form>
      <Heading className="mb-2">Search</Heading>
      <div className="flex min-w-85">
        <Field className="basis-3/4">
          <Label>
            <Combobox
              name="item"
              placeholder="Select item..."
              options={items}
              displayValue={(item) => item?.name}
              value={item}
              onChange={setItem}
              image={
                item
                  ? `https://render.albiononline.com/v1/item/${item.id}.png`
                  : null
              }
            >
              {(item) => (
                <ComboboxOption value={item}>
                  <img
                    src={`https://render.albiononline.com/v1/item/${item.id}.png`}
                    className="w-10 h-10 mr-2"
                    alt={item.name}
                  />
                  <ComboboxLabel>{item.name}</ComboboxLabel>
                </ComboboxOption>
              )}
            </Combobox>
          </Label>
        </Field>

        <Select
          name="status"
          className="basis-1/4 ml-2"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
        >
          <option value="all">All</option>
          <option value="normal">Normal</option>
          <option value="good">Good</option>
          <option value="outstanding">Outstanding</option>
          <option value="excellent">Excellent</option>
          <option value="masterpiece">Masterpiece</option>
        </Select>
      </div>
      <Button
        type="submit"
        onClick={onSubmit}
        className="mt-3 w-full min-w-85 hover:cursor-pointer"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
