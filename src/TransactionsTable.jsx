import { useContext, useState } from "react";
import { TransactionContext } from "./TransactionContext";

export default function TransactionsTable({ role }) {
  const { transactions, addTransaction } = useContext(TransactionContext);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    date: "", category: "", type: "income", amount: 0
  });

  const filtered = transactions.filter(t =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ["Date", "Category", "Type", "Amount"];

    const rows = transactions.map(t => [
      t.date,
      t.category,
      t.type,
      t.amount
    ]);

    const csvContent =
      [headers, ...rows]
        .map(row => row.join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "transactions.csv");
    link.click();
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(transactions, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "transactions.json");
    link.click();
  };

  const handleAdd = () => {
    if (!newTransaction.date || !newTransaction.category || !newTransaction.amount) {
      alert("Please fill all fields");
      return;
    }
    addTransaction({ ...newTransaction, amount: Number(newTransaction.amount) });
    setShowModal(false);
    setNewTransaction({ date: "", category: "", type: "income", amount: 0 });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow transition-colors duration-300">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Transactions
      </h2>

      {role === "admin" && (
        <div className="flex space-x-2 mb-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
            onClick={() => setShowModal(true)}
          >
            Add Transaction
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
            onClick={exportCSV}
          >
            Export CSV
          </button>
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors duration-200"
            onClick={exportJSON}
          >
            Export JSON
          </button>
        </div>
      )}

      <input
        type="text"
        placeholder="Search by category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
      />

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
              <th className="p-2 border dark:border-gray-600">Date</th>
              <th className="p-2 border dark:border-gray-600">Category</th>
              <th className="p-2 border dark:border-gray-600">Type</th>
              <th className="p-2 border dark:border-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="p-2 border dark:border-gray-600">{t.date}</td>
                <td className="p-2 border dark:border-gray-600">{t.category}</td>
                <td className="p-2 border dark:border-gray-600">{t.type}</td>
                <td className="p-2 border dark:border-gray-600">${t.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow w-96 transform scale-95 animate-scaleIn">
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Add Transaction</h3>
            <input type="date" value={newTransaction.date}
              onChange={e => setNewTransaction({...newTransaction, date: e.target.value})}
              className="mb-2 p-2 border rounded w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            />
            <input type="text" placeholder="Category" value={newTransaction.category}
              onChange={e => setNewTransaction({...newTransaction, category: e.target.value})}
              className="mb-2 p-2 border rounded w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            />
            <select value={newTransaction.type}
              onChange={e => setNewTransaction({...newTransaction, type: e.target.value})}
              className="mb-2 p-2 border rounded w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <input type="number" placeholder="Amount" value={newTransaction.amount}
              onChange={e => setNewTransaction({...newTransaction, amount: e.target.value})}
              className="mb-4 p-2 border rounded w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            />
            <div className="flex justify-end space-x-2">
              <button className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                onClick={() => setShowModal(false)}>Cancel</button>
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleAdd}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
