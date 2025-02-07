import { useState } from "react";

// Interface cho TimeFilter
interface TimeFilterProps {
    setTimeRange: (value: string) => void;
    startDate: string;
    endDate: string;
    setStartDate: (value: string) => void;
    setEndDate: (value: string) => void;
    fetchData: () => void;
}

const TimeFilter: React.FC<TimeFilterProps> = ({ setTimeRange, startDate, endDate, setStartDate, setEndDate, fetchData }) => {
    const [isCustom, setIsCustom] = useState(false);

    const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setTimeRange(value);
        setIsCustom(value === ""); // Kiểm tra nếu chọn "Lựa chọn thời gian"
    };

    return (
        <div>
            {/* Dropdown chọn khoảng thời gian */}
            <div className="relative">
                <select
                    className="w-full border rounded-lg px-4 py-3 text-[#303030] focus:outline-none focus:ring-2 focus:ring-blue-400"
                    defaultValue="daily"
                    onChange={handleTimeRangeChange}
                >
                    <option value="daily">Ngày</option>
                    <option value="weekly">Tuần</option>
                    <option value="monthly">Tháng</option>
                    <option value="">Lựa chọn thời gian</option>
                </select>
            </div>

            {/* Chọn khoảng thời gian nếu chọn "Lựa chọn thời gian" */}
            {isCustom && (
                <div className="mt-4 space-y-3">
                    <label className="text-[#303030] font-semibold">Chọn khoảng thời gian:</label>
                    <div className="flex space-x-4">
                        <input
                            type="date"
                            className="border rounded-lg px-4 py-2 text-[#303030] focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <input
                            type="date"
                            className="border rounded-lg px-4 py-2 text-[#303030] focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                </div>
            )}

            {/* Nút Xem nếu đã chọn khoảng thời gian */}
            {((!isCustom) || (isCustom && startDate && endDate)) && (
                <div className="flex items-center justify-between mt-4">
                    {isCustom && (
                        <p className="text-[#303030]">
                            Từ <b>{startDate}</b> đến <b>{endDate}</b>
                        </p>
                    )}
                    <button
                        className="px-4 py-2 rounded-lg bg-[#40BB15] text-white font-semibold"
                        onClick={fetchData}
                    >
                        Xem
                    </button>
                </div>
            )}
        </div>
    );
};

export default TimeFilter;