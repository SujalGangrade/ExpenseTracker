import React, { useEffect, useState } from "react";
import CustomPieChart from "./CustomPieChart";
const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4F39F6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  // console.log(data);
  // console.log(totalIncome);
  const [chartData, setChartData] = useState([]);

  const perpareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(dataArr);
  };

  useEffect(() => {
    perpareChartData();
    return () => {};
  }, [data]);
  //  console.log(chartData);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>
      <CustomPieChart
        data={chartData}
        label="Total Balance"
        totalAmount={`$${totalIncome}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default RecentIncomeWithChart;
