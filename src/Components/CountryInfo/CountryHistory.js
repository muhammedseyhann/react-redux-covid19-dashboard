import { useEffect } from "react";
import {
    getHistoryOfCountryData,
    selectCountryHistoryData,
} from "../../redux/covidDataSlice";
import { useSelector, useDispatch } from "react-redux";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Loading from "../Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLineChart } from "@fortawesome/free-solid-svg-icons";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Chart.js Line Chart",
        },
    },
};

function CountryHistory({ code }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHistoryOfCountryData(code));
    }, [code]);

    let { data, isLoading } = useSelector(selectCountryHistoryData);
    const options1 = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    font: {
                        size: 16,
                        lineHeight: 4,
                    },
                },
            },
            title: {
                display: true,
                text: "Total Cases in 30 Days",
                font: {
                    size: 24,
                    weight: 700,
                },
            },
        },
    };

    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    font: {
                        size: 16,
                        lineHeight: 4,
                    },
                },
            },
            title: {
                display: true,
                text: "Total Deaths in 30 Days",
                font: {
                    size: 24,
                    weight: 700,
                },
            },
        },
    };

    return data && !isLoading ? (
        <div className="my-8 mx-4">
            <div className="inline-flex items-center gap-4 text-2xl md:text-3xl my-4 text-slate-200">
                <FontAwesomeIcon icon={faLineChart} />
                <h1>{"Country Statistics : " + data.country}</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="border-b-yellow-600 border-b-8 rounded-xl p-2 bg-slate-200">
                    <Line
                        options={options1}
                        data={{
                            labels: Object.keys(data.timeline.cases),
                            datasets: [
                                {
                                    label: "Total Cases",
                                    data: Object.values(data.timeline.cases),
                                    borderColor: "#ca8a04",
                                },
                            ],
                        }}
                    />
                </div>

                <div className="border-b-red-500 border-b-8 rounded-xl p-2 bg-slate-200">
                    <Line
                        options={options2}
                        data={{
                            labels: Object.keys(data.timeline.deaths),
                            datasets: [
                                {
                                    label: "Total Deaths",
                                    data: Object.values(data.timeline.deaths),
                                    borderColor: "#ef4444",
                                },
                            ],
                        }}
                    />
                </div>
            </div>
        </div>
    ) : (
        <Loading />
    );
}

export default CountryHistory;
