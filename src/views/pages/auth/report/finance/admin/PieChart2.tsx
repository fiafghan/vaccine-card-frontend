import { Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PieChartTwoProps {
  type1: number;
  type2: number;
  type3: number;
  title?: string;
  description?: string;
}

const COLORS = ["#22c55e", "#86efac", "#d9f7d9"]; // green, light green, very light green

export default function PieChartTwo({
  type1,
  type2,
  type3,
  title = "Pie Chart Two",
  description = "Distribution",
}: PieChartTwoProps) {
  if (type1 + type2 + type3 === 0) {
    return (
      <Card className="p-4 bg-green-50">
        <p className="text-center text-green-700">
          No data available for travel types.
        </p>
      </Card>
    );
  }

  const chartData = [
    { name: "Type 1", value: type1, fill: COLORS[0] },
    { name: "Type 2", value: type2, fill: COLORS[1] },
    { name: "Type 3", value: type3, fill: COLORS[2] },
  ];

  return (
    <Card className="flex flex-col bg-green-50 rounded-2xl shadow-md print:bg-green-50 print:shadow-md w-full max-w-[500px] mx-auto">
  <CardHeader className="items-center pb-0">
    <CardTitle className="text-green-700 text-xl">{title}</CardTitle>
    <CardDescription className="text-green-600">{description}</CardDescription>
  </CardHeader>
  <CardContent className="flex justify-center items-center p-4 h-[350px] print:h-[350px]">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip
          contentStyle={{
            backgroundColor: "#f0fdf4",
            borderRadius: 8,
            borderColor: "#22c55e",
          }}
          labelStyle={{
            color: "#15803d",
            fontWeight: "bold",
          }}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius="80%"
          stroke="#15803d"
          strokeWidth={1}
          label={({ name, percent }) =>
            `${name}: ${(percent! * 100).toFixed(0)}%`
          }
        />
      </PieChart>
    </ResponsiveContainer>
  </CardContent>
</Card>
  );
}
