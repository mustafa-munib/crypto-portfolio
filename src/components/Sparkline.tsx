import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface Props {
  data: number[];
}

export const Sparkline: React.FC<Props> = ({ data }) => {
  const chartData = data.map((value, index) => ({ value }));
  const isPositive = data[0] <= data[data.length - 1];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={isPositive ? '#10B981' : '#EF4444'}
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};