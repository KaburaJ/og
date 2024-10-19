import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Charts = () => {
  const [batchId, setBatchId] = useState("Batch 1");
  const [data, setData] = useState(null);

  const batchDataArray = [
    {
      batchId: "Batch 1",
      quantity: 50,
      ripe: 30,
      unripe: 15,
      overripe: 5,
      damaged: 0,
      dominantGrade: "A",
    },
    {
      batchId: "Batch 2",
      quantity: 40,
      ripe: 20,
      unripe: 15,
      overripe: 3,
      damaged: 2,
      dominantGrade: "B",
    },
  ];

  const handleBatchIdChange = (e) => {
    setBatchId(e.target.value);
  };

  const handleFetchData = () => {
    const foundData = batchDataArray.find((batch) => batch.batchId === batchId);
    if (foundData) {
      setData(foundData);
    } else {
      alert("Batch ID not found!");
      setData(null);
    }
  };

  const barChartData = {
    labels: ["Quantity"],
    datasets: [
      {
        label: `Total Quantity of ${batchId}`,
        data: data ? [data.quantity] : [],
        backgroundColor: "#008000",
      },
    ],
  };

  const pieChartData = {
    labels: ["Ripe", "Unripe", "Overripe", "Damaged"],
    datasets: [
      {
        label: `Fruit Quality for ${batchId}`,
        data: data ? [data.ripe, data.unripe, data.overripe, data.damaged] : [],
        backgroundColor: ["#008000", "#8B9F00", "#FF5455", "#FF0000"],
      },
    ],
  };

  return (
    <>
      <div className="app-wrapper">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl">
            <h1 className="app-page-title">Charts</h1>
            <div className="mb-3">
              <input
                type="text"
                value={batchId}
                onChange={handleBatchIdChange}
                placeholder="Enter Batch ID"
                className="form-control"
              />
              <button className="btn app-btn-primary mt-2" onClick={handleFetchData}>
                Fetch Data
              </button>
            </div>

            <div className="row g-4 mb-4">
                {/* Pie Chart for Fruit Quality */}
              <div className="col-12 col-lg-6">
                <div className="app-card app-card-chart h-100 shadow-sm">
                  <div className="app-card-header p-3 border-0">
                    <h4 className="app-card-title">Fruit Quality</h4>
                  </div>
                  <div className="app-card-body p-4">
                    <div className="chart-container">
                      <Pie data={pieChartData} />
                    </div>
                  </div>
                </div>
              </div>
              {/* Bar Chart for Quantity */}
              <div className="col-12 col-lg-6">
                <div className="app-card app-card-chart h-100 shadow-sm">
                  <div className="app-card-header p-3 border-0">
                    <h4 className="app-card-title">Total Quantity</h4>
                  </div>
                  <div className="app-card-body p-4">
                    <div className="chart-container">
                      <Bar data={barChartData} />
                    </div>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;
