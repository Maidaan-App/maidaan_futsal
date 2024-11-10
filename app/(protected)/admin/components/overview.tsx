import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function Overview({ DashboardData }: any) {
  const currentYear = new Date().getFullYear();

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={DashboardData.monthlyIncome} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          label={{
            value: `Month (${currentYear})`,
            position: 'bottom', // Position can be 'top', 'bottom', 'left', 'right'
            offset: 10,
            fontSize: 14,
            fill: '#888888',
          }}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
          label={{
            value: 'Income (Rs.)',
            angle: -90, // Rotates the label for vertical positioning
            position: 'left', // 'left' or 'right'
            fontSize: 14,
            fill: '#888888',
            offset: 10,
          }}
        />
        <Bar
          dataKey="monthlyIncome"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
