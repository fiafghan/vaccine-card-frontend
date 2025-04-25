import { Area, AreaChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";

// Define the shape of the data
interface CountryPassengerData {
  country: string; // The full name of the country
  passengers: number; // The number of passengers in that country
}

// Props the component will receive
interface AreaChartProps {
  data: CountryPassengerData[]; // An array of countries and passengers
}

// Chart color and label configuration
const chartConfig = {
  passengers: {
    label: "Passengers", // Label for the chart
    color: "#00AA00", // Green color for the passengers line
  },
} satisfies ChartConfig;

export default function AreaChartTow({ data }: AreaChartProps) {
  // Limit data to the first 250 countries (if there are more than 250)
  const chartData = data.slice(0, 250).map((item) => ({
    country: item.country,
    passengers: item.passengers,
  }));

  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-800">Passenger Stats</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Showing number of passengers by country
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{ top: 30, right: 30, left: 20, bottom: 70 }} // Increased bottom margin for label space
            >
              {/* Add grid lines on the background */}
              <CartesianGrid vertical={false} stroke="#f0f0f0" strokeDasharray="5 5" />
              
              {/* X-Axis for full country names with label rotation */}
              <XAxis
                dataKey="country" // Key that stores the country name
                tickLine={false} // Remove lines from the ticks
                axisLine={{ stroke: "#CCCCCC", strokeWidth: 1 }} // Gray axis line
                tickMargin={8} // Space between ticks
                tickFormatter={(value) => value} // Show the full country name without abbreviation
                stroke="#666666" // Dark gray color for the text
                fontSize={12}
                angle={-45} // Rotate labels by -45 degrees to prevent overlap
                textAnchor="end" // Align text to the end after rotation
              />
              
              {/* Tooltip with improved styling */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF", // White background for the tooltip
                  borderRadius: "8px",
                  padding: "10px",
                  fontSize: "14px",
                  color: "#333333", // Dark text for better readability
                }}
                labelStyle={{
                  fontWeight: "bold",
                  color: "#333333", // Dark text for the label
                }}
                itemStyle={{
                  color: "#00AA00", // Green color for the data points
                }}
              />
              
              {/* Area for the passengers data */}
              <Area
                dataKey="passengers" // Key that stores the number of passengers
                type="linear" // Linear type graph
                stroke="#00AA00" // Green line for the passengers
                fill="rgba(0, 170, 0, 0.2)" // Light green area with transparency
                fillOpacity={1} // Full opacity for the fill area
              >
                {/* Add labels for each point on the line */}
                <LabelList
                  dataKey="passengers" // Use the 'passengers' key for the label
                  position="top" // Display labels on top of the points
                  fill="#00AA00" // Green color for the labels
                  fontSize={12} // Font size of the labels
                />
              </Area>
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
