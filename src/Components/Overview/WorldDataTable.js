import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWorldData, selectWorldData } from "../../redux/covidDataSlice";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/css/tabulator_bulma.min.css";
import Loading from "../Loading";

function WorldDataTable() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWorldData());
    }, []);

    const { data, isLoading } = useSelector(selectWorldData);
    const columns = [
        {
            title: "Flag",
            field: "flag",
            headerSort: false,
            formatter: "image",
            formatterParams: {
                height: "32px",
            },
        },
        { title: "Country", field: "country", headerSort: false },
        { title: "Total Cases", field: "total_cases" },
        { title: "Active Cases", field: "active_cases" },
        { title: "New Cases", field: "new_cases" },
        { title: "Total Recovered", field: "total_recovered" },
        { title: "New Recovered", field: "new_recovered" },
        { title: "Total Deaths", field: "total_deaths" },
        { title: "New Deaths", field: "new_deaths" },
        { title: "Critical Cases", field: "critical_cases" },
        { title: "Total Tests", field: "tests" },
        { title: "Population", field: "population" },
    ];
    columns.forEach((item, index) => {
        if (index === 0) item.width = 75;
        else item.minWidth = 150;
        item.hozAlign = "center";
        item.vertAlign = "center";
        item.headerHozAlign = "center";
        item.resizable = false;
    });
    const tableData = data.map((country, index) => {
        const {
            cases,
            active,
            todayCases,
            recovered,
            todayRecovered,
            deaths,
            todayDeaths,
            critical,
            tests,
            population,
        } = country;

        const flag = country.countryInfo.flag;
        const countryName = country.country;

        return {
            id: index,
            flag: flag,
            country: countryName,
            total_cases: Intl.NumberFormat("tr-TR").format(cases),
            active_cases: Intl.NumberFormat("tr-TR").format(active),
            new_cases: Intl.NumberFormat("tr-TR").format(todayCases),
            total_recovered: Intl.NumberFormat("tr-TR").format(recovered),
            new_recovered: Intl.NumberFormat("tr-TR").format(todayRecovered),
            total_deaths: Intl.NumberFormat("tr-TR").format(deaths),
            new_deaths: Intl.NumberFormat("tr-TR").format(todayDeaths),
            critical_cases: Intl.NumberFormat("tr-TR").format(critical),
            tests: Intl.NumberFormat("tr-TR").format(tests),
            population: Intl.NumberFormat("tr-TR").format(population),
        };
    });
    const options = {
        pagination: "local",
        paginationSize: 10,
        paginationButtonCount: 5,
        paginationSizeSelector: [10, 25, 50, true],
        renderVertical: "virtual",
    };
    return data && !isLoading ? (
        <div className="border-b-8 border-purple-600 rounded-lg">
            <ReactTabulator
                className="rounded-t-lg"
                columns={columns}
                data={tableData}
                layout={"fitData"}
                options={options}
            />
        </div>
    ) : (
        <Loading />
    );
}

export default WorldDataTable;
