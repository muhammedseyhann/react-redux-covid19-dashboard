import "./App.css";
import Overview from "./Components/Overview/Overview";
import WorldMap from "./Components/WorldMap/WorldMap";
import CountryInfo from "./Components/CountryInfo/CountryInfo";
import Footer from "./Components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Routes, Route, Link } from "react-router-dom";
import {
    faCircleInfo,
    faFlag,
    faGlobe,
    faVirusCovid,
} from "@fortawesome/free-solid-svg-icons";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
    const location = useLocation();

    const [path, setPath] = useState("location.pathname");

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setPath(location.pathname);
    }, [location]);
    return (
        <>
            <header className="flex justify-between items-center p-4 border-b-2">
                <div className="text-2xl text-slate-200">
                    <Link to="/">
                        <span>Covid-19 Tracker</span>
                        <FontAwesomeIcon icon={faVirusCovid} className="ml-2" />
                    </Link>
                </div>
                {/* Navbar */}
                <nav className="text-xl">
                    <div className="hidden md:block tabs tabs-boxed p-1 bg-base-100">
                        <Link
                            to={"/"}
                            className={path === "/" ? "tab tab-active" : "tab"}
                        >
                            <FontAwesomeIcon
                                icon={faCircleInfo}
                                className="mr-2"
                            />
                            General Overview
                        </Link>
                        <Link
                            to={"/worldMap"}
                            className={
                                path === "/worldMap" ? "tab tab-active" : "tab"
                            }
                        >
                            <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                            World Map
                        </Link>
                        <Link
                            to={"/countryInfo"}
                            className={
                                path === "/countryInfo"
                                    ? "tab tab-active"
                                    : "tab"
                            }
                        >
                            <FontAwesomeIcon icon={faFlag} className="mr-2" />
                            Country Info
                        </Link>
                    </div>

                    <button
                        className="btn btn-primary rounded-lg block md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg
                            className="swap-off fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 512 512"
                        >
                            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                        </svg>
                    </button>
                </nav>
            </header>

            {/* Mobile Navbar Menu */}
            <div className={isOpen ? "block" : "hidden"}>
                <ul className=" menu bg-base-300 p-2 w-full border-b-4 border-primary">
                    <li className="hover:bg-primary hover:text-slate-200 rounded-xl">
                        <Link to="/" onClick={() => setIsOpen(false)}>
                            <FontAwesomeIcon
                                icon={faCircleInfo}
                                className="mr-1"
                            />
                            General Overview
                        </Link>
                    </li>
                    <li className="hover:bg-primary hover:text-slate-200 rounded-xl">
                        <Link to="/worldMap" onClick={() => setIsOpen(false)}>
                            <FontAwesomeIcon icon={faGlobe} className="mr-1" />
                            World Map
                        </Link>
                    </li>
                    <li className="hover:bg-primary hover:text-slate-200 rounded-xl">
                        <Link
                            to="/countryInfo"
                            onClick={() => setIsOpen(false)}
                        >
                            <FontAwesomeIcon icon={faFlag} className="mr-1" />
                            Country Info
                        </Link>
                    </li>
                </ul>
            </div>

            <Routes>
                <Route exact path="/" element={<Overview />} />
                <Route path="/worldMap" element={<WorldMap />} />
                <Route path="/countryInfo" element={<CountryInfo />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
