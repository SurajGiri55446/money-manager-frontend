import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  ComposedChart
} from "recharts";
import { TrendingUp, TrendingDown } from 'lucide-react';

const CustomLineChart = ({ data, type = "income", title = "Monthly Trend" }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="text-center py-12">
          <div className="text-4xl mb-3">📈</div>
          <p className="text-gray-500 text-sm">No {type} data to display</p>
          <p className="text-gray-400 text-xs mt-1">
            Add some {type === 'income' ? 'income' : 'expenses'} to see the trend
          </p>
        </div>
      </div>
    );
  }

  // Calculate trend
  const totalAmount = data.reduce((sum, item) => sum + (item.total || 0), 0);
  const averageAmount = totalAmount / data.length;
  const firstValue = data[0]?.total || 0;
  const lastValue = data[data.length - 1]?.total || 0;
  const trend = lastValue - firstValue;
  const trendPercentage = firstValue > 0 ? ((trend / firstValue) * 100) : 0;

  // Colors based on type
  const colors = {
    income: {
      gradient: ['#10b981', '#059669'],
      line: '#10b981',
      area: '#10b98120',
      dot: '#059669',
      trend: 'text-green-600'
    },
    expense: {
      gradient: ['#ef4444', '#dc2626'],
      line: '#ef4444',
      area: '#ef444420',
      dot: '#dc2626',
      trend: 'text-red-600'
    },
    default: {
      gradient: ['#3b82f6', '#6366f1'],
      line: '#3b82f6',
      area: '#3b82f620',
      dot: '#6366f1',
      trend: 'text-blue-600'
    }
  };

  const currentColors = colors[type] || colors.default;

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-800 mb-2">{label}</p>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: currentColors.line }}
            />
            <p className="text-sm text-gray-600">
              Amount: <span className="font-semibold">₹{payload[0].value.toLocaleString()}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Customized dot for active points
  const CustomizedDot = (props) => {
    const { cx, cy } = props;
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={4} 
        fill={currentColors.dot}
        stroke="#ffffff"
        strokeWidth={2}
      />
    );
  };

  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">Last {data.length} months</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-800">
            ₹{totalAmount.toLocaleString()}
          </p>
          <div className={`flex items-center gap-1 text-sm ${currentColors.trend}`}>
            {trend >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>
              {trend >= 0 ? '+' : ''}{trendPercentage.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id={`colorGradient-${type}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentColors.gradient[0]} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={currentColors.gradient[1]} stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#f3f4f6" 
              vertical={false}
            />
            
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              padding={{ left: 10, right: 10 }}
            />
            
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Area
              type="monotone"
              dataKey="total"
              stroke="none"
              fill={`url(#colorGradient-${type})`}
              fillOpacity={1}
            />
            
            <Line
              type="monotone"
              dataKey="total"
              stroke={currentColors.line}
              strokeWidth={3}
              dot={<CustomizedDot />}
              activeDot={{ 
                r: 6, 
                fill: currentColors.dot,
                stroke: "#ffffff",
                strokeWidth: 2
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Summary */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-500">Average</p>
            <p className="text-lg font-semibold text-gray-800">
              ₹{averageAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Highest</p>
            <p className="text-lg font-semibold text-gray-800">
              ₹{Math.max(...data.map(d => d.total)).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Lowest</p>
            <p className="text-lg font-semibold text-gray-800">
              ₹{Math.min(...data.map(d => d.total)).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomLineChart;