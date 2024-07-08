import { DownloadIcon } from "../Utils/Icons";
import * as XLSX from "xlsx/xlsx.mjs";

const DownloadBtn = ({ data = [], fileName }) => {
  return (
    <div className="">
      <button
        className=" flex items-center gap-1 text-[12px] text-white font-semibold bg-darkblue h-10 w-24 px-3 rounded-lg"
        onClick={() => {
          const datas = data?.length ? data : [];
          const worksheet = XLSX.utils.json_to_sheet(datas);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
          XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : "data.xlsx");
        }}
      >
        <DownloadIcon />
        Download
      </button>
    </div>
  );
};

export default DownloadBtn;
