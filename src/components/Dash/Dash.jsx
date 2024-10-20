import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);


const Dash = () => {
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [{ label: 'Quantity of Coffee Berries', data: [], borderColor: '#008000', backgroundColor: '#008000', fill: true }],
  });

  const [ripeCount, setRipeCount] = useState(0);
  const [halfRipeCount, setHalfripeCount] = useState(0);
  const [unripeCount, setUnripeCount] = useState(0);
  const [overripeCount, setOverripeCount] = useState(0);
  const [damagedCount, setDamagedCount] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [size, setSize] = useState(0)
  const [density, setDensity] = useState(0)



  useEffect(() => {
    const fetchData = async () => {
      const dataRef = ref(database, 'data/batch');
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const ripe = Object.keys(data).reduce((acc, key) => data[key].label === "Ripe" ? acc + 1 : acc, 0);
          const halfripe = Object.keys(data).reduce((acc, key) => data[key].label === "Halfripe" ? acc + 1 : acc, 0);
          const unripe = Object.keys(data).reduce((acc, key) => data[key].label === "Unripe" ? acc + 1 : acc, 0);
          const overripe = Object.keys(data).reduce((acc, key) => data[key].label === "OverRipe" ? acc + 1 : acc, 0);
          const damaged = Object.keys(data).reduce((acc, key) => data[key].label === "Damaged" ? acc + 1 : acc, 0);
          const x = Object.keys(data).reduce((acc, key) => data[key].x)
          const y = Object.keys(data).reduce((acc, key) => data[key].y)
          const width = Object.keys(data).reduce((acc, key) => data[key].width)
          const height = Object.keys(data).reduce((acc, key) => data[key].height)

          setRipeCount(ripe);
          setHalfripeCount(halfripe)
          setUnripeCount(unripe);
          setOverripeCount(overripe);
          setDamagedCount(damaged);


        }
      });
    };

    fetchData();
  }, []);

  const [barChartData, setBarChartData] = useState({
    labels: ['Sorting 1', 'Sorting 2', 'Sorting 3', 'Sorting 4', 'Sorting 5'],
    datasets: [
      { label: 'Ripe', data: [], backgroundColor: '#008000', borderColor: '#008000' },
      { label: 'Halfripe', data: [], backgroundColor: '#45674E', borderColor: '#45674E' },
      { label: 'Unripe', data: [], backgroundColor: '#8B9F00', borderColor: '#8B9F00' },
      { label: 'OverRipe', data: [], backgroundColor: '#FF5455', borderColor: '#FF5455' },
      { label: 'Damaged', data: [], backgroundColor: '#FF0000', borderColor: '#FF0000' },
    ],
  });
  useEffect(() => {
    const fetchData = async () => {
      const dataRef = ref(database, 'data/batch');
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const labels = Object.keys(data);
          const ripe = labels.map((key) => data[key].label === "Ripe" ? 1 : 0);
          const halfripe = labels.map((key) => data[key].label === "Halfripe" ? 1 : 0);
          const unripe = labels.map((key) => data[key].label === "Unripe" ? 1 : 0);
          const overripe = labels.map((key) => data[key].label === "OverRipe" ? 1 : 0);
          const damaged = labels.map((key) => data[key].label === "Damaged" ? 1 : 0);
          const last_width = labels.map((key) => data[key].width)
          const width =last_width[last_width.length - 1];
          const last_x = labels.map((key) => data[key].x);
          const x =last_x[last_x.length - 1];
          const last_y = labels.map((key) => data[key].y)
          const y =last_y[last_y.length - 1];
          const last_height = labels.map((key) => data[key].height)
          const height =last_height[last_height.length - 1];

          setX(x)
          setY(y)
          setWidth(width)
          setHeight(height)
          setSize((width * height))
          function calculateDensity(width, mass) {
            const radius = width / 2;

            const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);

            const density = mass / volume;

            return density;
          }

          setDensity(calculateDensity(width, 100).toFixed(2))

          setLineChartData((prev) => ({
            ...prev,
            labels: labels, // Time or batches
            datasets: [{ ...prev.datasets[0], data: labels.map(key => data[key].confidence * 100) }], // Assuming confidence as quantity
          }));

          setBarChartData((prev) => ({
            ...prev,
            datasets: [
              { ...prev.datasets[0], data: ripe },
              { ...prev.datasets[1], data: halfripe },
              { ...prev.datasets[1], data: unripe },
              { ...prev.datasets[2], data: overripe },
              { ...prev.datasets[3], data: damaged },
            ],
          }));
        }
      });
    };

    fetchData();
  }, []);


  return (
    <div className="app-wrapper">
      <div className="app-content pt-3 p-md-3 p-lg-4">
        <div className="container-xl">
          <h1 className="app-page-title">Overview</h1>
          <div
            className="app-card alert alert-dismissible shadow-sm mb-4 border-left-decoration"
            role="alert"
          >
            <div className="inner">
              <div className="app-card-body p-3 p-lg-4">
                <h3 className="mb-3">Welcome, Admin!</h3>
                {/* <div className="row gx-5 gy-3"> */}
                <div className="col-12 col-lg-9">
                  <div>
                    This Coffee Sorter Dashboard is designed to help visualize the output data from the Coffee Sorter hardware. Find the confidence rates of the different classes of coffee, the current berry size and density, and the various visualizations!
                  </div>
                </div>
              </div>
              {/*//app-card-body*/}
            </div>
            {/*//inner*/}
          </div>
          {/*//app-card*/}
          <div className="row g-4 mb-4" >
            <div className="col-6 col-lg-3" >
              <div className="app-card app-card-stat shadow-sm h-100" style={{ backgroundColor: "green" }}>
                <div className="app-card-body p-3 p-lg-4">
                  <h4 className="stats-type mb-1" style={{ color: "white" }}>Ripe Berries</h4>
                  <div className="stats-figure" style={{ color: "white" }}>{ripeCount}</div>
                </div>
                {/*//app-card-body*/}
                <a className="app-card-link-mask" href="#" />
              </div>
              {/*//app-card*/}
            </div>
            {/*//col*/}
            <div className="col-6 col-lg-3" >
              <div className="app-card app-card-stat shadow-sm h-100" style={{ backgroundColor: "#45674E" }}>
                <div className="app-card-body p-3 p-lg-4">
                  <h4 className="stats-type mb-1" style={{ color: "white" }}>Half Ripe Berries</h4>
                  <div className="stats-figure" style={{ color: "white" }}>{halfRipeCount}</div>
                </div>
                {/*//app-card-body*/}
                <a className="app-card-link-mask" href="#" />
              </div>
              {/*//app-card*/}
            </div>
            <div className="col-6 col-lg-3">
              <div className="app-card app-card-stat shadow-sm h-100" style={{ backgroundColor: "#8B9F00" }}>
                <div className="app-card-body p-3 p-lg-4">
                  <h4 className="stats-type mb-1" style={{ color: "white" }}>Unripe berries</h4>
                  <div className="stats-figure" style={{ color: "white" }}>{unripeCount}</div>
                </div>
                {/*//app-card-body*/}
                <a className="app-card-link-mask" href="#" />
              </div>
              {/*//app-card*/}
            </div>
            {/*//col*/}
            <div className="col-6 col-lg-3">
              <div className="app-card app-card-stat shadow-sm h-100" style={{ backgroundColor: "#FF5455" }}>
                <div className="app-card-body p-3 p-lg-4">
                  <h4 className="stats-type mb-1" style={{ color: "white" }}>Overripe Berries</h4>
                  <div className="stats-figure" style={{ color: "white" }}>{overripeCount}</div>
                </div>
                {/*//app-card-body*/}
                <a className="app-card-link-mask" href="#" />
              </div>
              {/*//app-card*/}
            </div>
            {/*//col*/}
            <div className="col-6 col-lg-3">
              <div className="app-card app-card-stat shadow-sm h-100" style={{ backgroundColor: "red" }}>
                <div className="app-card-body p-3 p-lg-4">
                  <h4 className="stats-type mb-1" style={{ color: "white" }}>Damaged berries</h4>
                  <div className="stats-figure" style={{ color: "white" }}>{damagedCount}</div>
                </div>
                {/*//app-card-body*/}
                <a className="app-card-link-mask" href="#" />
              </div>
              {/*//app-card*/}
            </div>
            {/*//col*/}
            <div className="col-6 col-lg-3">
              <div className="app-card app-card-stat shadow-sm h-100" style={{ backgroundColor: "#4A99D7" }}>
                <div className="app-card-body p-3 p-lg-4">
                  <h4 className="stats-type mb-1" style={{ color: "white" }}>Current Berry Size (mm^2)</h4>
                  <div className="stats-figure" style={{ color: "white" }}>{size}</div>
                </div>
                {/*//app-card-body*/}
                <a className="app-card-link-mask" href="#" />
              </div>
              {/*//app-card*/}
            </div>
            <div className="col-6 col-lg-3">
              <div className="app-card app-card-stat shadow-sm h-100" style={{ backgroundColor: "#1C4B79" }}>
                <div className="app-card-body p-3 p-lg-4">
                  <h4 className="stats-type mb-1" style={{ color: "white" }}>Current Berry Density (g/cm^3) </h4>
                  <div className="stats-figure" style={{ color: "white" }}>{density} </div>
                </div>
                {/*//app-card-body*/}
                <a className="app-card-link-mask" href="#" />
              </div>
              {/*//app-card*/}
            </div>
          </div>
          {/*//row*/}
          <div className="row g-4 mb-4">
            <div className="col-12 col-lg-6">
              <div className="app-card app-card-chart h-100 shadow-sm">
                <div className="app-card-header p-3">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-auto">
                      <h4 className="app-card-title">Quantity of Coffee Berries</h4>
                    </div>
                  </div>
                  {/*//row*/}
                </div>
                {/*//app-card-header*/}
                <div className="app-card-body p-3 p-lg-4">
                  <div className="mb-3 d-flex">
                    <select className="form-select form-select-sm ms-auto d-inline-flex w-auto">
                      <option value={1} selected="">
                        This week
                      </option>
                      <option value={2}>Today</option>
                      <option value={3}>This Month</option>
                      <option value={3}>This Year</option>
                    </select>
                  </div>
                  <div className="chart-container">
                    <Line data={lineChartData} options={{ responsive: true }} />
                  </div>
                </div>
                {/*//app-card-body*/}
              </div>
              {/*//app-card*/}
            </div>
            {/*//col*/}
            <div className="col-12 col-lg-6">
              <div className="app-card app-card-chart h-100 shadow-sm">
                <div className="app-card-header p-3">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-auto">
                      <h4 className="app-card-title">Berries' Sorting Metrics</h4>
                    </div>
                  </div>
                  {/*//row*/}
                </div>
                {/*//app-card-header*/}
                <div className="app-card-body p-3 p-lg-4">
                  <div className="mb-3 d-flex">
                    <select className="form-select form-select-sm ms-auto d-inline-flex w-auto">
                      <option value={1} selected="">
                        This week
                      </option>
                      <option value={2}>Today</option>
                      <option value={3}>This Month</option>
                      <option value={3}>This Year</option>
                    </select>
                  </div>
                  <div className="chart-container">
                    <Bar data={barChartData} options={{ responsive: true }} />
                  </div>
                </div>
                {/*//app-card-body*/}
              </div>
              {/*//app-card*/}
            </div>
            {/*//col*/}
          </div>
          {/* <div className="col-12 col-lg-6">
                <div className="app-card app-card-stats-table h-100 shadow-sm">
                  <div className="app-card-header p-3">
                    <div className="row justify-content-between align-items-center">
                      <div className="col-auto">
                        <h4 className="app-card-title">Grading Data</h4>
                      </div>
                    </div>
                  </div>
                  <div className="app-card-body p-3 p-lg-4">
                    <div className="table-responsive">
                      <table className="table table-borderless mb-0">
                        <thead>
                          <tr>
                            <th className="meta">Grade</th>
                            <th className="meta stat-cell">Numbers</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <a href="#">A</a>
                            </td>
                            <td className="stat-cell">110</td>

                          </tr>
                          <tr>
                            <td>
                              <a href="#">A</a>
                            </td>
                            <td className="stat-cell">110</td>
                          </tr>
                          <tr>
                            <td>
                              <a href="#">A</a>
                            </td>
                            <td className="stat-cell">110</td>
                          </tr>
                          <tr>
                            <td>
                              <a href="#">A</a>
                            </td>
                            <td className="stat-cell">110</td>
                          </tr>
                          <tr>
                            <td>
                              <a href="#">A</a>
                            </td>
                            <td className="stat-cell">110</td>
                          </tr>
                          <tr>
                            <td>
                              <a href="#">A</a>
                            </td>
                            <td className="stat-cell">110</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div> */}

        </div>
        {/*//container-fluid*/}
      </div>
    </div>
  )
}

export default Dash