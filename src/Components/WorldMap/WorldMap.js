import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWorldData, selectWorldData } from "../../redux/covidDataSlice";
import { MapContainer, TileLayer, GeoJSON, Tooltip } from "react-leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

import geoData from "./countries.geo.json";
import Loading from "../Loading";

function WorldMap() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getWorldData());
    }, []);

    const { data, isLoading } = useSelector(selectWorldData);

    //Added Total Cases Number to Country Geo Properties
    const addedCasesData = geoData.features.map((item) => {
        const { un_a3 } = item.properties;
        const country = data.find(
            (item) => item.countryInfo._id === Number(un_a3)
        );
        if (country === undefined) return item;
        else {
            item.properties.TotalCases = country.cases;
            return item;
        }
    });

    const getColor = (d) => {
        d = d / 10 ** 6;
        return d > 50
            ? "#b30000"
            : d > 25
            ? "#e34a33"
            : d > 10
            ? "#e34a33"
            : d > 5
            ? "#fdbb84"
            : d > 1
            ? "#fdd49e"
            : "#fef0d9";
    };

    const pathOptions = (feature) => {
        const TotalCases = feature.properties.TotalCases;
        return {
            fillColor: TotalCases ? getColor(TotalCases) : "white",
            fillOpacity: 0.9,
            weight: 2,
            opacity: 1,
            dashArray: 1,
            color: "white",
        };
    };

    const mouseOver = (e) => {
        const layer = e.target;
        layer.setStyle({
            dashArray: "",
            fillColor: "#737373",
            weight: 2,
            opacity: 1,
            color: "white",
        });
    };

    const mouseOut = (e, feature) => {
        const layer = e.target;
        const TotalCases = feature.properties.TotalCases;
        layer.setStyle({
            fillColor: TotalCases ? getColor(TotalCases) : "white",
            fillOpacity: 0.9,
            weight: 2,
            dashArray: 1,
            color: "white",
        });
    };

    return data && !isLoading ? (
        <div className="px-4 pt-4 relative">
            <h1 className="text-center my-4 text-2xl text-slate-200 align-middle">
                <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                Distribution Map of Total Number of Cases
            </h1>
            <MapContainer
                center={[45, 0]}
                zoom={2}
                scrollWheelZoom={true}
                className="w-full h-[700px] rounded-lg border-b-8 border-purple-600"
            >
                <TileLayer
                    opacity={0}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {addedCasesData.map((country, index) => {
                    const TotalCases = country.properties.TotalCases;
                    const name = country.properties.name;
                    return (
                        <GeoJSON
                            key={index}
                            data={country}
                            pathOptions={pathOptions(country)}
                            eventHandlers={{
                                mouseover: (e) => mouseOver(e),
                                mouseout: (e) => mouseOut(e, country),
                            }}
                        >
                            <Tooltip sticky direction="top" opacity={1}>
                                {`${name} : ${
                                    TotalCases === undefined
                                        ? "No Data"
                                        : Intl.NumberFormat("tr-TR").format(
                                              TotalCases
                                          )
                                }`}
                            </Tooltip>
                        </GeoJSON>
                    );
                })}
            </MapContainer>
            <div className="absolute bottom-14 right-9 w-40 h-60 p-4 bg-slate-200 rounded-lg text-slate-800 border border-slate-800 z-[1000]">
                <h1 className="text-center text-xl">Total Cases</h1>
                <ul className="mt-2">
                    <li className="inline-flex items-center">
                        <span className="w-4 h-4 mr-2 rounded-md bg-[#b30000]"></span>{" "}
                        {">"}50.000.000
                    </li>
                    <li className="inline-flex items-center">
                        <span className="w-4 h-4 mr-2 rounded-md bg-[#e34a33]"></span>{" "}
                        {">"}25.000.000
                    </li>
                    <li className="inline-flex items-center">
                        <span className="w-4 h-4 mr-2 rounded-md bg-[#e34a33]"></span>{" "}
                        {">"}10.000.000
                    </li>
                    <li className="inline-flex items-center">
                        <span className="w-4 h-4 mr-2 rounded-md bg-[#fdbb84]"></span>{" "}
                        {">"}5.000.000
                    </li>
                    <li className="inline-flex items-center">
                        <span className="w-4 h-4 mr-2 rounded-md bg-[#fdd49e]"></span>{" "}
                        {">"}1.000.000
                    </li>
                    <li className="inline-flex items-center">
                        <span className="w-4 h-4 mr-2 rounded-md bg-[#fef0d9]"></span>{" "}
                        {"<"}1.000.000
                    </li>
                </ul>
            </div>
        </div>
    ) : (
        <Loading />
    );
}

export default WorldMap;
