import { Pie, PieChart, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AgePieChartProps {
  under_18: number;
  age_19_29: number;
  age_30_50: number;
  over_50: number;
  title?: string;
  description?: string;
}

const COLORS = ["#22c55e", "#000000", "#d9f7d9", "#facc15"]; // green, black, light green, yellow

export default function AgePieChart({
  under_18,
  age_19_29,
  age_30_50,
  over_50,
  title = "Age Distribution",
  description = "Passenger Age Categories",
}: AgePieChartProps) {
  const total = under_18 + age_19_29 + age_30_50 + over_50;

  if (total === 0) {
    return (
      <Card className="p-4">
        <p className="text-center text-black">
          No data available for age categories.
        </p>
      </Card>
    );
  }

  const chartData = [
    { name: "Under 18", value: under_18, fill: COLORS[0] },
    { name: "19-29", value: age_19_29, fill: COLORS[1] },
    { name: "30-50", value: age_30_50, fill: COLORS[2] },
    { name: "Over 50", value: over_50, fill: COLORS[3] },
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
        <div style={{ width: 300, height: 300, margin: "0 auto" }}>
          <PieChart width={300} height={300}>
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
              outerRadius={110}
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
