import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const CustomPieChart = ({ data, colors, totalAmount, label, type = "expense" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    // Reset animation when data changes
    setAnimationKey(prev => prev + 1);
  }, [data]);

  const chartData = data.map((item) => ({
    name: item.name,
    value: item.amount,
    icon: item.icon || '💰'
  }));

  // Custom label component
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, 
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="600"
        className="drop-shadow-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-xl border border-gray-200 backdrop-blur-sm transform transition-all duration-200 scale-105">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{data.icon}</span>
            <p className="font-semibold text-gray-800">{data.name}</p>
          </div>
          <p className="text-gray-600">
            Amount: <span className="font-semibold">₹{data.value.toLocaleString()}</span>
          </p>
          <p className="text-gray-600">
            Percentage: <span className="font-semibold">{(payload[0].percent * 100).toFixed(1)}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-4 px-2">
        {payload.map((entry, index) => (
          <div 
            key={`legend-${index}`} 
            className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full transition-all duration-200 hover:bg-gray-100 hover:scale-105"
          >
            <div 
              className="w-3 h-3 rounded-full transition-transform duration-200 hover:scale-125"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600 font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  const gradientColors = {
    expense: ['#ef4444', '#f87171', '#dc2626', '#fca5a5', '#b91c1c'],
    income: ['#10b981', '#34d399', '#059669', '#6ee7b7', '#047857']
  };

  const currentColors = colors || gradientColors[type] || [
    '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef'
  ];

  return (
    <div className={`w-full bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 transform ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    }`}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
            type === 'income' ? 'bg-green-500 shadow-lg shadow-green-200' : 'bg-red-500 shadow-lg shadow-red-200'
          }`}></div>
          <h4 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {label}
          </h4>
        </div>
        <div className="relative inline-block">
          <p className={`text-2xl sm:text-3xl font-bold transition-all duration-500 ${
            type === 'income' ? 'text-green-600' : 'text-red-600'
          }`}>
            ₹{totalAmount?.toLocaleString() || '0'}
          </p>
          <div className={`absolute -inset-1 rounded-lg blur opacity-25 transition duration-1000 ${
            type === 'income' ? 'bg-green-200' : 'bg-red-200'
          }`}></div>
        </div>
        <p className="text-sm text-gray-500 mt-2 font-medium">
          {data.length} {data.length === 1 ? 'category' : 'categories'}
        </p>
      </div>

      {/* Chart */}
      <div className="h-56 sm:h-64 relative">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart key={animationKey}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={type === 'income' ? 35 : 45}
                outerRadius={type === 'income' ? 70 : 80}
                paddingAngle={2}
                dataKey="value"
                label={renderCustomizedLabel}
                animationDuration={800}
                animationBegin={200}
                animationEasing="ease-out"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={currentColors[index % currentColors.length]}
                    stroke="#ffffff"
                    strokeWidth={3}
                    className="transition-all duration-500 hover:opacity-80 cursor-pointer"
                    style={{
                      filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))'
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={renderLegend} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center transform transition-all duration-500 hover:scale-105">
              <div className="text-4xl mb-3 animate-bounce">📊</div>
              <p className="text-gray-500 text-sm font-medium">No data available</p>
              <p className="text-gray-400 text-xs mt-1">
                Add some {type === 'income' ? 'income' : 'expenses'} to see the chart
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      {data.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.slice(0, 4).map((item, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-gray-200 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg transition-transform duration-200 hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="text-sm font-semibold text-gray-700 truncate max-w-[100px] sm:max-w-[120px]">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-bold text-gray-900 bg-white px-2 py-1 rounded-lg border border-gray-200">
                  ₹{item.amount?.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          
          {/* Show more indicator */}
          {data.length > 4 && (
            <div className="text-center mt-3">
              <span className="text-xs text-gray-400 font-medium bg-gray-50 px-3 py-1 rounded-full">
                +{data.length - 4} more categories
              </span>
            </div>
          )}
        </div>
      )}

      {/* Loading shimmer effect */}
      {data.length === 0 && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse opacity-50"></div>
      )}
    </div>
  );
};

export default CustomPieChart;