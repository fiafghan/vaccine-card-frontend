import { useLocation } from "react-router-dom";
import ReportCoverPage from "./CoverPageEPIAdmin";

export default function ReportResultPage() {
  const location = useLocation();
  // Receive filters passed via `state`
  const filters = location.state?.filters || {
    zone: "All Zones",
    gender: "All",
    travelType: "All",
    destination: "All",
  };

  // Use the same mockZoneData or move it to a shared file if needed.
  // For brevity, let's assume it's imported or accessible here (you can reuse the logic from the main page)
  // You can copy & import the filtering logic or pass the filtered data here as well

  // Here I will replicate minimal data & filtering just to demo:

  // Example: You can refactor your mockZoneData + filtering into a helper function
  // For now, I will just display the filters and a placeholder report

  return (
    <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Generated Report
      </h1>

      <div className="mb-10">
        <ReportCoverPage
          userName="Test User"
          generationDate={new Date().toLocaleString()}
          filters={filters}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-green-700 text-center">
          Report Results (Filtered)
        </h2>
        <pre className="bg-gray-100 p-4 rounded border overflow-auto">
          {JSON.stringify(filters, null, 2)}
        </pre>
      </div>
    </div>
  );
}
