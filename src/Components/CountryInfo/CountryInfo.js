import { useState } from "react";
import countries from "../countries.json";
import CountryHistory from "./CountryHistory";

function CountryInfo() {
    const [country, setCountry] = useState(792);

    const handleSelect = (id) => {
        setCountry(id);
    };
    return (
        <div className="p-4">
            <div className="text-center mx-auto my-4 max-w-sm">
                {
                    <select
                        className="select select-bordered bg-primary focus:outline-none focus:ring focus:ring-violet-300 text-slate-200 text-base w-full"
                        value={country}
                        onChange={(e) => handleSelect(e.target.value)}
                    >
                        {countries.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                }
            </div>

            <CountryHistory code={country} />
        </div>
    );
}

export default CountryInfo;
