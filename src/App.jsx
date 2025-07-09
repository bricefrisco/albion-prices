import {useEffect, useState} from 'react'
import {Field, Label} from "./catalyst/fieldset.jsx";
import {Combobox, ComboboxLabel, ComboboxOption} from "./catalyst/combobox.jsx";
import {Heading, Subheading} from "./catalyst/heading.jsx";
import {Button} from "./catalyst/button.jsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./catalyst/table.jsx";

function App() {
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('./items.json');
            const data = await res.json();
            setItems(data);
        }

        fetchData();
    }, []);

    return (
        <div className="w-full flex justify-center">
            <div className="pt-10 flex flex-col w-full max-w-2xl">
                <Heading className="mb-2">Search</Heading>
                <Field className="min-w-85">
                    <Label>
                        <Combobox
                            name="item"
                            placeholder="Select item..."
                            options={items}
                            displayValue={(item) => item?.value}
                            value={item}
                            onChange={setItem}
                            image={item ? `https://render.albiononline.com/v1/item/${item.id}.png` : null}
                        >
                            {(item) => (
                                <ComboboxOption value={item}>
                                    <img src={`https://render.albiononline.com/v1/item/${item.id}.png`}
                                         className="w-10 h-10 mr-2" alt={item.value}/>
                                    <ComboboxLabel>
                                        {item.value}
                                    </ComboboxLabel>
                                </ComboboxOption>
                            )}
                        </Combobox>
                    </Label>
                </Field>
                <Button className="mt-3 min-w-85 hover:cursor-pointer">Search</Button>

                {item && (
                    <div className="mt-5 w-full max-w-3xl">
                        <Subheading>{item.value}</Subheading>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeader>City</TableHeader>
                                    <TableHeader>Sell Order</TableHeader>
                                    <TableHeader>Instant Sell</TableHeader>
                                    <TableHeader>Buy Price</TableHeader>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-bold">Black Market</TableCell>
                                    <TableCell>Test</TableCell>
                                    <TableCell>Test</TableCell>
                                    <TableCell>Test</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">Caerleon</TableCell>
                                    <TableCell>Test</TableCell>
                                    <TableCell>Test</TableCell>
                                    <TableCell>Test</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">Brecilien</TableCell>
                                    <TableCell>Test</TableCell>
                                    <TableCell>Test</TableCell>
                                    <TableCell>Test</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">Bridgewatch</TableCell>
                                    <TableCell>Test</TableCell>
                                    <TableCell>Test</TableCell>
                                    <TableCell>Test</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">Fort Sterling</TableCell>
                                    <TableCell>Test</TableCell>
                                    <TableCell>Test</TableCell>
                                    <TableCell>Test</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">Lymhurst</TableCell>
                                    <TableCell>Test</TableCell>
                                    <TableCell>Test</TableCell>
                                    <TableCell>Test</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">Martlock</TableCell>
                                    <TableCell>Test</TableCell>
                                    <TableCell>Test</TableCell>
                                    <TableCell>Test</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">Thetford</TableCell>
                                    <TableCell>Test</TableCell>
                                    <TableCell>Test</TableCell>
                                    <TableCell>Test</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
