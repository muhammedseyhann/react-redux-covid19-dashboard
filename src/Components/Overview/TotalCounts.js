import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTotalCounts, getTotalCounts } from "../../redux/covidDataSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHospital,
    faHeartPulse,
    faBedPulse,
    faTruckMedical,
    faHeartCirclePlus,
    faHouseMedicalCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";
import Loading from "../Loading";

function TotalCounts() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTotalCounts());
    }, []);
    const { data, isLoading } = useSelector(selectTotalCounts);

    return data && !isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 my-4">
            {/* First Item */}
            <div className="flex justify-between items-center p-4 bg-slate-700 rounded-lg border-b-8 border-blue-500">
                <span className="text-white">
                    {/* <p className="text-2xl">
                        {Intl.NumberFormat("tr-TR").format(data.TotalCases)}
                    </p> */}
                    <CountUp
                        start={0}
                        end={data.cases}
                        duration={2.5}
                        separator="."
                        className="text-2xl"
                    />
                    <p className="opacity-50">Total Cases</p>
                </span>
                <span className="bg-blue-500 text-white p-4 rounded-full">
                    <FontAwesomeIcon icon={faHospital} className="text-3xl" />
                </span>
            </div>

            {/* Second Item */}
            <div className="flex justify-between items-center p-4 bg-slate-700 rounded-lg border-b-8 border-green-600">
                <span className="text-white">
                    <CountUp
                        start={0}
                        end={data.recovered}
                        duration={2.5}
                        separator="."
                        className="text-2xl"
                    />
                    <p className="opacity-50">Total Recovered</p>
                </span>
                <span className="bg-green-600 text-white p-4 rounded-full">
                    <FontAwesomeIcon icon={faHeartPulse} className="text-3xl" />
                </span>
            </div>
            {/* Third Item */}
            <div className="flex justify-between items-center p-4 bg-slate-700 rounded-lg border-b-8 border-red-500">
                <span className="text-white">
                    <CountUp
                        start={0}
                        end={data.deaths}
                        duration={2.5}
                        separator="."
                        className="text-2xl"
                    />
                    <p className="opacity-50">Total Deaths</p>
                </span>
                <span className="bg-red-500 text-white p-4 rounded-full">
                    <FontAwesomeIcon icon={faBedPulse} className="text-3xl" />
                </span>
            </div>
            {/* Forth Item */}
            <div className="flex justify-between items-center p-4 bg-slate-700 rounded-lg border-b-8 border-yellow-600">
                <span className="text-white">
                    <CountUp
                        start={0}
                        end={data.todayCases}
                        duration={2.5}
                        separator="."
                        className="text-2xl"
                    />
                    <p className="opacity-50">New Cases</p>
                </span>
                <span className="bg-yellow-600 text-white p-4 rounded-full">
                    <FontAwesomeIcon
                        icon={faTruckMedical}
                        className="text-3xl"
                    />
                </span>
            </div>
            {/* Fifth Item */}
            <div className="flex justify-between items-center p-4 bg-slate-700 rounded-lg border-b-8 border-green-600">
                <span className="text-white">
                    <CountUp
                        start={0}
                        end={data.todayRecovered}
                        duration={2.5}
                        separator="."
                        className="text-2xl"
                    />
                    <p className="opacity-50">New Recovered</p>
                </span>
                <span className="bg-green-600 text-white p-4 rounded-full">
                    <FontAwesomeIcon
                        icon={faHeartCirclePlus}
                        className="text-3xl"
                    />
                </span>
            </div>
            {/* Sixth Item */}
            <div className="flex justify-between items-center p-4 bg-slate-700 rounded-lg border-b-8 border-red-500">
                <span className="text-white">
                    <CountUp
                        start={0}
                        end={data.todayDeaths}
                        duration={2.5}
                        separator="."
                        className="text-2xl"
                    />
                    <p className="opacity-50">New Deaths</p>
                </span>
                <span className="bg-red-500 text-white p-4 rounded-full">
                    <FontAwesomeIcon
                        icon={faHouseMedicalCircleExclamation}
                        className="text-3xl"
                    />
                </span>
            </div>
        </div>
    ) : (
        <Loading />
    );
}

export default TotalCounts;
