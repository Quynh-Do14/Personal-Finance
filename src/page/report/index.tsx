import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import LayoutClient from "../../infrastructure/common/Layouts/Client-Layout";
import "../../assets/styles/page/report.css"
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

type Transaction = {
    id: number;
    type: "income" | "expense";
    description: string;
    amount: number;
};

const ReportPage = () => {
    const transactions: Transaction[] = [
        { id: 1, type: "income", description: "Salary", amount: 5000 },
        { id: 2, type: "expense", description: "Rent", amount: 1500 },
        { id: 3, type: "expense", description: "Groceries", amount: 400 },
        { id: 4, type: "income", description: "Freelancing", amount: 800 },
        { id: 5, type: "expense", description: "Transportation", amount: 200 },
    ];

    const income = transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const expenses = transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const data = {
        labels: ["Thu", "Chi"],
        datasets: [
            {
                label: "Tổng tiền ($)",
                data: [income, expenses],
                backgroundColor: ["#34D399", "#F87171"],
            },
        ],
    };
    const groupedTransactions = transactions.reduce((acc: Record<string, number>, transaction) => {
        acc[transaction.description] = (acc[transaction.description] || 0) + transaction.amount;
        return acc;
    }, {});

    const pieData = {
        labels: Object.keys(groupedTransactions),
        datasets: [
            {
                data: Object.values(groupedTransactions),
                backgroundColor: ["#34D399", "#F87171", "#60A5FA", "#FBBF24", "#A78BFA"],
                hoverBackgroundColor: ["#059669", "#B91C1C", "#2563EB", "#D97706", "#7C3AED"],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Tổng quát",
            },
        },
    };

    return (
        <LayoutClient>
            <div className="personal-finance-container">
                <div className="banner">
                    <div className='overlay'></div>
                    <div className="layout text-center bg-cover bg-center py-20">
                    </div>
                </div>
                <div className="padding-common">
                    <h1 className="text-3xl font-bold text-center text-[#464c56] mb-6">Báo cáo tài chính</h1>

                    <div className="* mx-auto bg-white rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-[#464c56] mb-4">Tổng quan thu chi</h2>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-[#41bb1529] p-4 rounded-lg text-[#1d9b5e]">
                                <h3 className="font-semibold">Tổng thu</h3>
                                <p className="text-2xl font-bold">${income}</p>
                            </div>
                            <div className="bg-[#c4292929] p-4 rounded-lg text-[#c42929]">
                                <h3 className="font-semibold">Tổng chi</h3>
                                <p className="text-2xl font-bold">${expenses}</p>
                            </div>
                        </div>

                        <h2 className="text-xl font-semibold text-[#464c56] mb-4">Chi tiết</h2>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="border-b py-2">Danh mục</th>
                                    <th className="border-b py-2">Loại</th>
                                    <th className="border-b py-2">Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td className="py-2 border-b">{transaction.description}</td>
                                        <td className={`py-2 border-b ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                                            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                        </td>
                                        <td className="py-2 border-b">${transaction.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-[#464c56] mb-4">Biểu đồ thu chi theo danh mục</h2>
                            <Bar data={data} options={options} />
                            <h2 className="text-xl font-semibold text-[#464c56] mb-4">Biểu đồ thu chi các khoản thu chi</h2>
                            <div className="flex justify-center">
                                <Pie data={pieData} options={options} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </LayoutClient >
    );
};

export default ReportPage;
