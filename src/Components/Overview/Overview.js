import TotalCounts from "./TotalCounts";
import WorldDataTable from "./WorldDataTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableList } from "@fortawesome/free-solid-svg-icons";

function Overview() {
    return (
        <div className="px-4">
            <TotalCounts />
            <h1 className="text-slate-200 mt-8 mb-4 text-xl">
                <FontAwesomeIcon icon={faTableList} className="mr-2" />
                Statistics of All Countries
            </h1>
            <WorldDataTable />
        </div>
    );
}

export default Overview;
