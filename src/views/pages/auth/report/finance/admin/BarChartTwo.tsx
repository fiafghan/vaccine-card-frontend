import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";

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
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-green-700">{title}</CardTitle>
        <CardDescription className="text-green-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart
          width={350}
          height={250}
          data={chartData}
          margin={{ top: 20, right: 100, left: 1, bottom: 20 }}
        >
          {/* XAxis with category gender labels */}
          <XAxis
            dataKey="gender"
            stroke="green"
            tick={{ fill: "green", fontWeight: "bold" }}
            tickLine={false}
            axisLine={{ stroke: "green" }}
            interval={0} // show all ticks
          />
          {/* YAxis with numeric count */}
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
      </CardContent>
    </Card>
  );
}
