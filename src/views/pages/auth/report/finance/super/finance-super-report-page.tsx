import { useState, useMemo, useRef } from "react";
import ReportCoverPage from "./CoverPageFinanceSuper";
import BarChartTwo from "./BarChartTwo";
import PieChartTwo from "./PieChart2";
import AreaChartTow from "./AreaChartTwo";
import { Printer } from "lucide-react";

const zones = ["Herat", "Mazar", "Kabul", "Kandahar"];
const genders = ["All", "Males", "Females"];
const travelTypeOptions = ["All", "Type 1", "Type 2", "Type 3"];
const destinationsList = [
  "All",
  "Saudi Arabia",
  "Everywhere",
  "Turkey",
  "Iran",
  "Pakistan",
  "India",
  "Qatar",
  "UAE",
  "Germany",
  "USA",
  "UK",
  "Canada",
];

// Mock data same as before
const mockZoneData: Record<
  string,
  {
    males: number;
    females: number;
    travelTypes: { type1: number; type2: number; type3: number };
    destinations: Record<string, number>;
    ageCategories: Record<string, number>; // New field for age categories
  }
> = {
  Herat: {
    males: 120,
    females: 90,
    travelTypes: { type1: 40, type2: 60, type3: 20 },
    destinations: {
      "Saudi Arabia": 50,
      Everywhere: 20,
      Turkey: 10,
      Iran: 25,
      Pakistan: 15,
      India: 8,
      Qatar: 12,
      UAE: 14,
      Germany: 7,
      USA: 5,
      UK: 9,
      Canada: 6,
    },
    ageCategories: {
      "Under 18": 30,
      "19-29": 40,
      "30-50": 60,
      "Over 50": 20,
    },
  },
  Mazar: {
    males: 85,
    females: 100,
    travelTypes: { type1: 35, type2: 30, type3: 20 },
    destinations: {
      "Saudi Arabia": 30,
      Everywhere: 25,
      Turkey: 15,
      Iran: 10,
      Pakistan: 20,
      India: 5,
      Qatar: 10,
      UAE: 8,
      Germany: 4,
      USA: 6,
      UK: 7,
      Canada: 3,
    },
    ageCategories: {
      "Under 18": 25,
      "19-29": 35,
      "30-50": 50,
      "Over 50": 15,
    },
  },
  Kabul: {
    males: 200,
    females: 180,
    travelTypes: { type1: 90, type2: 70, type3: 20 },
    destinations: {
      "Saudi Arabia": 80,
      Everywhere: 30,
      Turkey: 20,
      Iran: 25,
      Pakistan: 22,
      India: 18,
      Qatar: 15,
      UAE: 19,
      Germany: 10,
      USA: 9,
      UK: 13,
      Canada: 7,
    },
    ageCategories: {
      "Under 18": 50,
      "19-29": 80,
      "30-50": 120,
      "Over 50": 30,
    },
  },
  Kandahar: {
    males: 60,
    females: 70,
    travelTypes: { type1: 25, type2: 20, type3: 15 },
    destinations: {
      "Saudi Arabia": 20,
      Everywhere: 15,
      Turkey: 12,
      Iran: 8,
      Pakistan: 10,
      India: 4,
      Qatar: 5,
      UAE: 6,
      Germany: 2,
      USA: 3,
      UK: 5,
      Canada: 1,
    },
    ageCategories: {
      "Under 18": 15,
      "19-29": 25,
      "30-50": 40,
      "Over 50": 10,
    },
  },
};

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


export default function FinanceSuperReportPage() {
  const [selectedZone, setSelectedZone] = useState<string>("All Zones");
  const [selectedGender, setSelectedGender] = useState<string>("All");
  const [selectedTravelType, setSelectedTravelType] = useState<string>("All");
  const [selectedDestination, setSelectedDestination] = useState<string>("All");
  const contentRef = useRef<HTMLDivElement>(null);
  

  // Controls visibility of entire header + filters block
  const [showFilters, setShowFilters] = useState(true);

  const baseData = useMemo(() => {
    if (selectedZone === "All Zones") {
      const aggregated = aggregateAllZones(mockZoneData);
      return {
        ...aggregated,
        ageCategories: zones.reduce((acc, zone) => {
          const ageData = mockZoneData[zone]?.ageCategories || {};
          for (const ageCat in ageData) {
            acc[ageCat] = (acc[ageCat] || 0) + ageData[ageCat];
          }
          return acc;
        }, {} as Record<string, number>),
      };
    }
  
    return (
      mockZoneData[selectedZone] ?? {
        males: 0,
        females: 0,
        travelTypes: { type1: 0, type2: 0, type3: 0 },
        destinations: {},
        ageCategories: {},
      }
    );
  }, [selectedZone]);
  const males =
    selectedGender === "All" || selectedGender === "Males" ? baseData.males : 0;
  const females =
    selectedGender === "All" || selectedGender === "Females"
      ? baseData.females
      : 0;

  const travelTypes = {
    type1:
      selectedTravelType === "All" || selectedTravelType === "Type 1"
        ? baseData.travelTypes.type1
        : 0,
    type2:
      selectedTravelType === "All" || selectedTravelType === "Type 2"
        ? baseData.travelTypes.type2
        : 0,
    type3:
      selectedTravelType === "All" || selectedTravelType === "Type 3"
        ? baseData.travelTypes.type3
        : 0,
  };

  const destinations = useMemo(() => {
    let filteredData = baseData.destinations;
  
    // First filter: Destination selection
    if (selectedDestination !== "All") {
      filteredData = {
        [selectedDestination]: baseData.destinations[selectedDestination] || 0
      };
    }
  
    // Second filter: Gender
    if (selectedGender !== "All") {
      const genderMultiplier = selectedGender === "Males" ? 1 : 0;
      const filteredEntries = Object.entries(filteredData).map(([dest, count]) => [
        dest,
        count * genderMultiplier
      ]);
      filteredData = Object.fromEntries(filteredEntries);
    }
  
    // Third filter: Travel Type
    if (selectedTravelType !== "All") {
      const totalTravelTypes = baseData.travelTypes.type1 + 
                             baseData.travelTypes.type2 + 
                             baseData.travelTypes.type3;
    
      // Type-safe key handling
      const typeNumber = selectedTravelType.split(" ")[1] as '1' | '2' | '3';
      const travelTypeKey = `type${typeNumber}` as keyof typeof baseData.travelTypes;
    
      // Handle potential division by zero
      const travelTypeRatio = totalTravelTypes > 0 
        ? baseData.travelTypes[travelTypeKey] / totalTravelTypes
        : 0;
    
      const filteredEntries = Object.entries(filteredData).map(([dest, count]) => [
        dest,
        Math.round(count * travelTypeRatio)
      ]);
      filteredData = Object.fromEntries(filteredEntries);
    }
    
  
    return filteredData;
  }, [baseData, selectedDestination, selectedGender, selectedTravelType]);

      
  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center 
    justify-start " ref={contentRef}>
      
      {/* Header + Filters: hidden together */}
      {showFilters && (
        <div className="print:hidden w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <h1 className="text-2xl font-bold text-green-700 mb-6 text-center uppercase">
            Report Viewer For Finance Super Admin
          </h1>

         
          <div className="mb-4">
            <h2 className="text-lg font-bold text-green-700 mb-4">Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Zone filter */}
              <div>
                <label
                  htmlFor="zone-select"
                  className="block text-sm font-semibold text-black mb-2"
                >
                  Select Zone
                </label>
                <select
                  id="zone-select"
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none 
                  focus:ring-2 focus:ring-green-600"
                >
                  <option value="All Zones">-- All Zones --</option>
                  {zones.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender filter */}
              <div>
                <label
                  htmlFor="gender-select"
                  className="block text-sm font-semibold text-black mb-2"
                >
                  Gender
                </label>
                <select
                  id="gender-select"
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none 
                  focus:ring-2 focus:ring-green-600"
                >
                  {genders.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              {/* Travel Type filter */}
              <div>
                <label
                  htmlFor="traveltype-select"
                  className="block text-sm font-semibold text-black mb-2"
                >
                  Travel Type
                </label>
                <select
                  id="traveltype-select"
                  value={selectedTravelType}
                  onChange={(e) => setSelectedTravelType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  {travelTypeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Destination filter */}
              <div>
                <label
                  htmlFor="destination-select"
                  className="block text-sm font-semibold text-black mb-2"
                >
                  Destination
                </label>
                <select
                  id="destination-select"
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  {destinationsList.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
              </div>
                  </div>
                </div>


                <div>
                <button
                  onClick={() => {
                    window.print();
                    setShowFilters(false);
                  }}
                  className="p-3 rounded-md bg-gray-900 hover:bg-gray-700 text-green-400 ring-gray-700 
                  shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 
                  focus:ring-gray-700 w-full flex justify-center"
                  aria-label="Print"
                >
                  <Printer className="w-5 h-5 mr-2" />Print
                </button>
                </div>
                

        </div>
      )}

      {/* Report Results Section */}
      <div  id = "report-section" className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8">
        <div  className="flex justify-center">
          {/* Cover Page of Report */}
          <ReportCoverPage
            userName="Test User"
            generationDate={new Date().toLocaleString()}
            filters={{
              zone: selectedZone,
              gender: selectedGender,
              travelType: selectedTravelType,
              destination: selectedDestination,
            }}
          />
        </div>

        <h2 className="text-xl font-bold text-green-700 mb-4 text-center">
          Report Results
        </h2>
        <div className="grid gap-4 md:grid-cols-2 text-black tex-sm print:report-section">
          <div className="p-2 border rounded-lg shadow-sm bg-green-50">
            <h2 className="text-base font-semibold mb-1 text-green-800">
              Gender Stats
            </h2>
            <p>
              Males: <strong>{males * 500} AFN</strong>
            </p>
            <p>
              Females: <strong>{females * 500} AFN</strong>
            </p>

            <BarChartTwo male={males * 500} female={females * 500} />
          </div>

          <div className="p-4 border rounded-lg shadow-sm bg-green-50">
            <h2 className="text-lg font-semibold mb-2 text-green-800">
              Travel Types
            </h2>
            <p>
              Type 1: <strong>{travelTypes.type1 * 500} AFN</strong>
            </p>
            <p>
              Type 2: <strong>{travelTypes.type2 * 500} AFN</strong>
            </p>
            <p>
              Type 3: <strong>{travelTypes.type3 * 500} AFN</strong>
            </p>
            <PieChartTwo
              type1={travelTypes.type1}
              type2={travelTypes.type2}
              type3={travelTypes.type3}
              title="Travel Type distribution"
            />
          </div>

          

          <div className="md:col-span-2 p-4 border rounded-lg shadow-sm bg-green-50">
            <h2 className="text-lg font-semibold mb-2 text-green-800">
              Destinations
            </h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              {Object.entries(destinations).map(([country, count]) => (
                <li key={country}>
                  {country}: <strong>{count * 500}</strong>
                </li>
              ))}
            </ul>
              <AreaChartTow 
              data={Object.entries(destinations).map(([country, passengers]) => ({
                country: country,
                passengers: passengers * 500
              }))} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
