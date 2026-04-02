import { useContext } from "react";
import { TransactionContext } from "./TransactionContext";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

export default function Charts() {
  const { transactions } = useContext(TransactionContext);

  //Monthly data (for line chart)
  const monthlyData = {};
  transactions.forEach(t => {
    const month = t.date.slice(0, 7);
    if (!monthlyData[month]) {
      monthlyData[month] = { month, income: 0, expense: 0 };
    }
    if (t.type === "income") monthlyData[month].income += t.amount;
    else monthlyData[month].expense += t.amount;
  });

  const lineData = Object.values(monthlyData);

  //Category data (for pie chart)
  const categoryTotals = {};
  transactions.forEach(t => {
    if (t.type === "expense") {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.keys(categoryTotals).map(key => ({
    name: key,
    value: categoryTotals[key],
  }));

  const COLORS = ["#4ade80", "#60a5fa", "#f472b6", "#facc15", "#fb923c"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

      {/* Line Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">
          Monthly Income vs Expenses
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <XAxis dataKey="month" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="income" stroke="#4ade80" />
            <Line type="monotone" dataKey="expense" stroke="#f87171" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">
          Expense Breakdown
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
