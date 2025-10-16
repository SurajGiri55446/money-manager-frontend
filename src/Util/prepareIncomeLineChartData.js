// utils/chartUtils.js
import moment from "moment";

export const prepareIncomeLineChartData = (transactions) => {
  if (!Array.isArray(transactions)) return [];

  const monthlyTotals = {};

  transactions.forEach((txn) => {
    const month = moment(txn.date).format("MMM YYYY");
    if (!monthlyTotals[month]) {
      monthlyTotals[month] = 0;
    }
    monthlyTotals[month] += Number(txn.amount);
  });

  const sortedMonths = Object.keys(monthlyTotals).sort(
    (a, b) => moment(a, "MMM YYYY") - moment(b, "MMM YYYY")
  );

  return sortedMonths.map((month) => ({
    month,
    total: monthlyTotals[month],
  }));
};
