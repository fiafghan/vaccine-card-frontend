import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BarChartTwoProps {
  male: number;
  female: number;
  title?: string;
  description?: string;
}

export default function BarChartTwo({
  male,
  female,
  title = "Gender Distribution",
  description = "Total males and females",
}: BarChartTwoProps) {
  const chartData = [
    { gender: "Male", count: male },
    { gender: "Female", count: female },
  ];

  return (
    <Card className="bg-green-50 rounded-2xl shadow-md print:bg-green-50 print:shadow-md 
    w-full max-w-[500px] mx-auto">
  <CardHeader>
    <CardTitle className="text-green-700">{title}</CardTitle>
    <CardDescription className="text-green-600">
      {description}
    </CardDescription>
  </CardHeader>
  <CardContent className="p-4 h-[350px] print:h-[350px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
      >
        <XAxis
          dataKey="gender"
          stroke="green"
          tick={{ fill: "green", fontWeight: "bold" }}
          tickLine={false}
          axisLine={{ stroke: "green" }}
        />
        <YAxis
          type="number"
          stroke="green"
          tick={{ fill: "green", fontWeight: "bold" }}
          tickLine={false}
          axisLine={{ stroke: "green" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderRadius: 8,
            borderColor: "green",
          }}
          labelStyle={{ color: "green", fontWeight: "bold" }}
        />
        <Bar dataKey="count" fill="#22c55e" radius={[5, 5, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </CardContent>
</Card>

  );
}
