import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase"; // Adjust path as needed
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

const Orders = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ripeCount, setRipeCount] = useState(0);
  const [halfRipeCount, setHalfRipeCount] = useState(0)
  const [unripeCount, setUnripeCount] = useState(0);
  const [overripeCount, setOverripeCount] = useState(0);
  const [damagedCount, setDamagedCount] = useState(0);
  const [confidence, setConfidence] = useState(0)
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [{ label: 'Quantity of Coffee Berries', data: [], borderColor: '#008000', backgroundColor: '#008000', fill: true }],
  });

  useEffect(() => {
    const fetchData = async () => {
      const dataRef = ref(database, 'data/batch');
      onValue(dataRef, (snapshot) => {
        const dataSnapshot = snapshot.val();
        if (dataSnapshot) {
          const batchData = Object.keys(dataSnapshot).map((key) => {
            const batch = dataSnapshot[key];
            const size = batch.width * batch.height;

            const ripe = Object.keys(dataSnapshot).reduce((acc, key) => dataSnapshot[key].label === "Ripe" ? acc + 1 : acc, 0);
            const halfripe = Object.keys(dataSnapshot).reduce((acc, key) => dataSnapshot[key].label === "halfripe" ? acc + 1 : acc, 0);
            const unripe = Object.keys(dataSnapshot).reduce((acc, key) => dataSnapshot[key].label === "Unripe" ? acc + 1 : acc, 0);
            const overripe = Object.keys(dataSnapshot).reduce((acc, key) => dataSnapshot[key].label === "OverRipe" ? acc + 1 : acc, 0);
            const damaged = Object.keys(dataSnapshot).reduce((acc, key) => dataSnapshot[key].label === "Damaged" ? acc + 1 : acc, 0);
            const confidence1 = Object.keys(dataSnapshot).reduce((acc, key) => dataSnapshot[key].confidence);

            setConfidence(confidence1)
            setRipeCount(ripe);
            setHalfRipeCount(halfripe)
            setUnripeCount(unripe);
            setOverripeCount(overripe);
            setDamagedCount(damaged);
            function calculateDensity(width, mass) {
              const radius = width / 2; 
              const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
              return mass / volume;
            }

            return {
              batchId: key,
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
          });

          setData(batchData.reverse());  
        }
      });
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  // Filter data by search term (Batch ID)
  const filteredData = data.filter((entry) => entry.batchId.includes(searchTerm));

  return (
    <>
      <div className="app-wrapper" style={{marginTop:"35px"}}>
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl">
            <div className="row g-3 mb-4 align-items-center justify-content-between">
              <div className="col-auto">
                <h1 className="app-page-title mb-0">Batches</h1>
              </div>
              <div className="col-auto">
                <div className="page-utilities">
                  <div className="row g-2 justify-content-start justify-content-md-end align-items-center">
                    <div className="col-auto">
                      <form className="table-search-form row gx-1 align-items-center" onSubmit={handleSearch}>
                        <div className="col-auto">
                          <input
                            type="text"
                            id="search-orders"
                            name="searchorders"
                            className="form-control search-orders"
                            placeholder="Search by Batch ID"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <div className="col-auto">
                          <button type="submit" className="btn app-btn-secondary">Search</button>
                        </div>
                      </form>
                    </div>
                    <div className="col-auto">
                      <select className="form-select w-auto">
                        <option selected="" value="option-1">All</option>
                        <option value="option-2">This week</option>
                        <option value="option-3">This month</option>
                        <option value="option-4">Last 3 months</option>
                      </select>
                    </div>
                    {/* <div className="col-auto">
                      <a className="btn app-btn-secondary" href="#">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-download me-1"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path fillRule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                          <path fillRule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                        Download CSV
                      </a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="app-card app-card-orders-table shadow-sm mb-5">
              <div className="app-card-body">
                <div className="table-responsive">
                  <table className="table app-table-hover mb-0 text-left">
                    <thead>
                      <tr>
                        <th className="cell">Batch ID</th>
                        <th className="cell">Quantity</th>
                        <th className="cell">Ripe</th>
                        <th className="cell">Half Ripe</th>
                        <th className="cell">Unripe</th>
                        <th className="cell">Overripe</th>
                        <th className="cell">Damaged</th>
                        <th className="cell">Density</th>
                        <th className="cell">Size</th>
                        <th className="cell">Dominant Grade</th>
                        <th className="cell">Confidence Rate</th>

                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((entry) => (
                        <tr key={entry.batchId}>
                          <td className="cell">{entry.batchId}</td>
                          <td className="cell">{entry.quantity}</td>
                          <td className="cell">{entry.ripe}</td>
                          <td className="cell">{entry.halfripe}</td>
                          <td className="cell">{entry.unripe}</td>
                          <td className="cell">{entry.overripe}</td>
                          <td className="cell">{entry.damaged}</td>
                          <td className="cell">{entry.density}</td>
                          <td className="cell">{entry.size}</td>
                          <td className="cell">{entry.dominantGrade}</td>
                          <td className="cell">{(confidence*100).toFixed(2)} %</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <nav className="app-pagination">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
