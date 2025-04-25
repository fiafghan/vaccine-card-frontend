import { useLocation } from "react-router-dom";
import ReportCoverPage from "./CoverPageEPISuper";
import BarChartTwo from "./BarChartTwo";
import PieChartTwo from "./PieChart2";
import AreaChartTwo from "./AreaChartTwo";
import mockZoneData from "./mockZoneData"; // move your mock data to separate file if preferred

function aggregateAllZones(zonesData: typeof mockZoneData) {
  const result = {
    males: 0,
    females: 0,
    travelTypes: { type1: 0, type2: 0, type3: 0 },
    destinations: {} as Record<string, number>,
  };
  for (const zone in zonesData) {
    const data = zonesData[zone];
    result.males += data.males;
    result.females += data.females;
    result.travelTypes.type1 += data.travelTypes.type1;
    result.travelTypes.type2 += data.travelTypes.type2;
    result.travelTypes.type3 += data.travelTypes.type3;
    for (const dest in data.destinations) {
      result.destinations[dest] =
        (result.destinations[dest] || 0) + data.destinations[dest];
    }
  }
  return result;
}

export default function ReportResult() {
  const { state } = useLocation();
  const { selectedZone, selectedGender, selectedTravelType, selectedDestination } = state;

  const baseData = selectedZone === "All Zones"
    ? aggregateAllZones(mockZoneData)
    : mockZoneData[selectedZone] || {
        males: 0,
        females: 0,
        travelTypes: { type1: 0, type2: 0, type3: 0 },
        destinations: {},
      };

  const males = selectedGender === "All" || selectedGender === "Males" ? baseData.males : 0;
  const females = selectedGender === "All" || selectedGender === "Females" ? baseData.females : 0;

  const travelTypes = {
    type1: selectedTravelType === "All" || selectedTravelType === "Type 1" ? baseData.travelTypes.type1 : 0,
    type2: selectedTravelType === "All" || selectedTravelType === "Type 2" ? baseData.travelTypes.type2 : 0,
    type3: selectedTravelType === "All" || selectedTravelType === "Type 3" ? baseData.travelTypes.type3 : 0,
  };

  const destinations = selectedDestination === "All"
    ? baseData.destinations
    : { [selectedDestination]: baseData.destinations[selectedDestination] || 0 };

  return (
    <div className="p-6">
      <ReportCoverPage />
      <BarChartTwo males={males} females={females} />
      <PieChartTwo travelTypes={travelTypes} />
      <AreaChartTwo destinations={destinations} />
    </div>
  );
}
