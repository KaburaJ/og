import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase"; // Adjust path as needed
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement } from 'chart.js';
import { Bar, Pie } from "react-chartjs-2";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement);

const Charts = () => {
  const [batchId, setBatchId] = useState(""); 
  const [batchData, setBatchData] = useState(null); 
  const [barChartData, setBarChartData] = useState({}); 
  const [pieChartData, setPieChartData] = useState({}); 

  const handleBatchIdChange = (e) => {
    setBatchId(e.target.value);
  };

  const handleFetchData = () => {
      const sanitizedBatchId = batchId.trim();  
      const invalidChars = /[.#$[\]]/;
    
      if (invalidChars.test(sanitizedBatchId)) {
        alert("Invalid batch ID. Please remove any special characters.");
        return;
      }
    
      const dataRef = ref(database, `data/batch/${sanitizedBatchId}`);
      onValue(dataRef, (snapshot) => {
        const batch = snapshot.val();
      if (batch) {
        const size = batch.width * batch.height;

        function calculateDensity(width, mass) {
          const radius = width / 2;  
          const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);  
          return mass / volume;
        }

        const batchInfo = {
          batchId: batchId,
          quantity: ((batch.label === "Ripe") + (batch.label === "halfRipe") + (batch.label === "Unripe") + (batch.label === "OverRipe") + (batch.label === "Damaged")) || 0, 
          ripe: batch.label === "Ripe" ? 1 : 0,
          halfripe: batch.label === "halfripe" ? 1 : 0,
          unripe: batch.label === "Unripe" ? 1 : 0,
          overripe: batch.label === "OverRipe" ? 1 : 0,
          damaged: batch.label === "Damaged" ? 1 : 0,
          density: calculateDensity(batch.width, 100).toFixed(2),  
          size: size.toFixed(2),
          dominantGrade: batch.label,
        };

        setBatchData(batchInfo);

        // Set data for the charts
        setBarChartData({
          labels: ["Total Quantity"],
          datasets: [
            {
              label: "Quantity of Berries",
              data: [batchInfo.quantity],
              backgroundColor: ["#4caf50"],
            },
          ],
        });

        setPieChartData({
          labels: ["Ripe", "Half Ripe", "Unripe", "Over Ripe", "Damaged"],
          datasets: [
            {
              label: "Fruit Quality",
              data: [batchInfo.ripe, batchInfo.halfripe, batchInfo.unripe, batchInfo.overripe, batchInfo.damaged],
              backgroundColor: ["#28a745", "#ffc107", "#ff5722", "#dc3545", "black"],
            },
          ],
        });
      } else {
        alert("Batch not found");
      }
    });
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

            {batchData && (
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
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;
