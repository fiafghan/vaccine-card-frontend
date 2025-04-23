import { Pie, PieChart, Tooltip } from "recharts";

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

const COLORS = ["#22c55e", "#000000", "#d9f7d9"]; // green, black, very light green (instead of white)

export default function PieChartTwo({
  type1,
  type2,
  type3,
  title = "Pie Chart Two",
  description = "Distribution",
}: PieChartTwoProps) {
  if (type1 + type2 + type3 === 0) {
    return (
      <Card className="p-4">
        <p className="text-center text-black">
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
    <Card className="flex flex-col bg-white">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-green-700">{title}</CardTitle>
        <CardDescription className="text-green-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div style={{ width: 250, height: 250, margin: "0 auto" }}>
          <PieChart width={250} height={250}>
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: 8,
                borderColor: "#22c55e",
              }}
              labelStyle={{ color: "#22c55e", fontWeight: "bold" }}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              stroke="#000"
              strokeWidth={1}
              label={({ name, percent }) =>
                `${name}: ${(percent! * 100).toFixed(0)}%`
              }
            />
          </PieChart>
        </div>
      </CardContent>
    </Card>
  );
}
