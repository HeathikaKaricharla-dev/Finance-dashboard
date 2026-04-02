import { useState, useContext } from 'react';
import { TransactionContext } from './TransactionContext';
import TransactionsTable from './TransactionsTable';
import Insights from './Insights';
import Charts from './Charts';

function App() {
  const { transactions } = useContext(TransactionContext);
  const [role, setRole] = useState('viewer');
  const [darkMode, setDarkMode] = useState(false);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen transition-colors duration-300`}>
      <div className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">

        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
          Finance Dashboard
        </h1>

        {/* Role & Dark Mode */}
        <div className="mb-6 flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <label className="font-semibold">Role:</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="font-semibold">Dark Mode:</label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={e => setDarkMode(e.target.checked)}
              className="h-5 w-5"
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow transition-colors duration-300">
            <h2 className="text-gray-500 dark:text-gray-300">Total Balance</h2>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">${totalBalance}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow transition-colors duration-300">
            <h2 className="text-gray-500 dark:text-gray-300">Income</h2>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">${totalIncome}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow transition-colors duration-300">
            <h2 className="text-gray-500 dark:text-gray-300">Expenses</h2>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">${totalExpense}</p>
          </div>
        </div>
        <Charts />
        <Insights />
        <TransactionsTable role={role} />

      </div>
    </div>
  );
}

export default App;
