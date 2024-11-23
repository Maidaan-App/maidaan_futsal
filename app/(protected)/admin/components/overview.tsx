// "use client";

// import { TrendingUp } from "lucide-react";
// import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";

// const chartConfig = {
//   monthlyIncome: {
//     label: "Income",
//     color: "hsl(var(--chart-1))",

//   },
// } satisfies ChartConfig;

// export function Overview({ DashboardData }: any) {
//   const currentYear = new Date().getFullYear();

//     // Custom tooltip content
//     const CustomTooltip = ({ active, payload }: any) => {
//       if (active && payload && payload.length) {
//         return (
//           <div className="rounded-md bg-primary text-primary-foreground p-2 shadow-md">
//             <p className="text-sm font-medium">
//               {`Rs ${payload[0].value.toLocaleString()}`}
//             </p>
//           </div>
//         );
//       }
//       return null;
//     };


//   return (
//     <Card className="col-span-1 lg:col-span-4">
//       <CardHeader>
//         <CardTitle>Monthly Income</CardTitle>
//         <CardDescription>January - June {currentYear}</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <BarChart accessibilityLayer data={DashboardData.monthlyIncome} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               stroke="#888888"
//               fontSize={12}
//               tickLine={false}
//               axisLine={false}
//               label={{
//                 value: `Month (${currentYear})`,
//                 position: "bottom",
//                 offset: 10,
//                 fontSize: 14,
//                 fill: "#888888",
//               }}
//             />
//             <YAxis
//               stroke="#888888"
//               fontSize={12}
//               tickLine={false}
//               axisLine={false}
//               tickFormatter={(value) => `${value}`}
//               label={{
//                 value: "Income (Rs.)",
//                 angle: -90,
//                 position: "left",
//                 fontSize: 14,
//                 fill: "#888888",
//                 offset: 10,
//               }}
//             />

//             <ChartTooltip
//               cursor={false}
//               content={<CustomTooltip  />}
              
//             />
//             <Bar
//               dataKey="monthlyIncome"
//               fill="currentColor"
//               radius={[4, 4, 0, 0]}
//               className="fill-primary"
//             />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col items-start gap-2 text-sm">
//         <div className="flex gap-2 font-medium leading-none">
//           Increment by 5.2% this month <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Showing monthly income for this year
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }

"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  monthlyIncome: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Overview({ DashboardData }: any) {
  const currentYear = new Date().getFullYear();

  // Calculate percentage change
  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 100; // Avoid division by zero, assume 100% increase
    return ((current - previous) / previous) * 100;
  };

  // Extract the latest and previous month's income
  const latestIncome =
    DashboardData?.monthlyIncome?.[DashboardData.monthlyIncome.length]
      ?.monthlyIncome ?? 0;
  const previousIncome =
    DashboardData?.monthlyIncome?.[DashboardData.monthlyIncome.length - 1]
      ?.monthlyIncome ?? 0;

  const percentageChange = calculatePercentageChange(latestIncome, previousIncome);

  // Determine if it's an increment or decrement
  const isIncrement = percentageChange > 0;

  // Custom tooltip content
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div 
        className="rounded-md bg-primary text-primary-foreground p-2 shadow-md"
        // className="rounded-md bg-white text-primary p-2 shadow-md"
        >
          <p className="text-sm font-medium">
            {`Rs ${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-1 lg:col-span-4">
      <CardHeader>
        <CardTitle>Monthly Income</CardTitle>
        <CardDescription>January - December {currentYear}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={DashboardData.monthlyIncome}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{
                value: `Month (${currentYear})`,
                position: "bottom",
                offset: 10,
                fontSize: 14,
                fill: "#888888",
              }}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              label={{
                value: "Income (Rs.)",
                angle: -90,
                position: "left",
                fontSize: 14,
                fill: "#888888",
                offset: 10,
              }}
            />

            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Bar
              dataKey="monthlyIncome"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {isIncrement ? (
            <>
              Increment by {percentageChange.toFixed(2)}% this month{" "}
              <TrendingUp className="h-4 w-4 text-green-500" />
            </>
          ) : (
            <>
              Decrement by {Math.abs(percentageChange).toFixed(2)}% this month{" "}
              <TrendingDown className="h-4 w-4 text-red-500" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing monthly income for this year
        </div>
      </CardFooter>
    </Card>
  );
}

