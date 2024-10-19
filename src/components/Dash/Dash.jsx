import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Bar, Line } from "react-chartjs-2";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);


const Dash = () => {
     // State for line chart data
    const [lineChartData, setLineChartData] = useState({
        labels: [],  // Initially empty array for labels
        datasets: [
            {
                label: 'Quantity of Coffee Berries',
                data: [],  // Initially empty array for data
                borderColor: '#008000',
                backgroundColor: '#008000',
                fill: true,
            },
        ],
    });

    // State for bar chart data (4 classes)
    const [barChartData, setBarChartData] = useState({
        labels: ['Sorting 1', 'Sorting 2', 'Sorting 3', 'Sorting 4', 'Sorting 5'], // Sortings
        datasets: [
            {
                label: 'Ripe',
                data: [12, 19, 10, 15, 5],  // Initial values for Ripe
                backgroundColor: '#008000',
                borderColor: '#008000',
                borderWidth: 1,
            },
            {
                label: 'Unripe',
                data: [5, 8, 12, 3, 9],  // Initial values for Unripe
                backgroundColor: '#8B9F00',
                borderColor: '#8B9F00',
                borderWidth: 1,
            },
            {
                label: 'Overripe',
                data: [2, 3, 8, 5, 7],  // Initial values for Overripe
                backgroundColor: '#FF5455',
                borderColor: '#FF5455',
                borderWidth: 1,
            },
            {
                label: 'Damaged',
                data: [1, 2, 1, 0, 3],  // Initial values for Damaged
                backgroundColor: '#FF0000',
                borderColor: '#FF0000',
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        // Simulate continuous data for line chart
        const interval = setInterval(() => {
            setLineChartData(prevData => {
                const newLabels = prevData.labels.length < 10 
                    ? [...prevData.labels, `Day ${prevData.labels.length + 1}`] 
                    : prevData.labels.slice(1).concat(`Day ${prevData.labels.length + 1}`);

                const newData = prevData.datasets[0].data.length < 10 
                    ? [...prevData.datasets[0].data, Math.floor(Math.random() * 100)] 
                    : prevData.datasets[0].data.slice(1).concat(Math.floor(Math.random() * 100));

                return {
                    labels: newLabels,
                    datasets: [{ ...prevData.datasets[0], data: newData }],
                };
            });
        }, 3000); // Update every 3 seconds for line chart

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Update bar chart data every 5 minutes
        const interval = setInterval(() => {
            setBarChartData(prevData => {
                return {
                    ...prevData,
                    datasets: prevData.datasets.map(dataset => ({
                        ...dataset,
                        data: dataset.data.map(() => Math.floor(Math.random() * 100)), // Simulate new data for each class
                    })),
                };
            });
        }, 300000); // Update every 5 minutes

        // Cleanup interval on unmount
        return () => clearInterval(interval);
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
                        This Coffee Sorter Dashboard is designed to help visualize the output data from the Coffee Sorter hardware. 
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
                <div className="app-card app-card-stat shadow-sm h-100" style={{backgroundColor:"green"}}>
                  <div className="app-card-body p-3 p-lg-4">
                    <h4 className="stats-type mb-1" style={{color:"white"}}>Ripe Berries</h4>
                    <div className="stats-figure" style={{color:"white"}}>628</div>
                  </div>
                  {/*//app-card-body*/}
                  <a className="app-card-link-mask" href="#" />
                </div>
                {/*//app-card*/}
              </div>
              {/*//col*/}
              <div className="col-6 col-lg-3">
                <div className="app-card app-card-stat shadow-sm h-100" style={{backgroundColor:"#8B9F00"}}>
                  <div className="app-card-body p-3 p-lg-4">
                    <h4 className="stats-type mb-1" style={{color:"white"}}>Unripe berries</h4>
                    <div className="stats-figure" style={{color:"white"}}>250</div>
                  </div>
                  {/*//app-card-body*/}
                  <a className="app-card-link-mask" href="#" />
                </div>
                {/*//app-card*/}
              </div>
              {/*//col*/}
              <div className="col-6 col-lg-3">
                <div className="app-card app-card-stat shadow-sm h-100" style={{backgroundColor:"#FF5455"}}>
                  <div className="app-card-body p-3 p-lg-4">
                    <h4 className="stats-type mb-1" style={{color:"white"}}>Overripe Berries</h4>
                    <div className="stats-figure" style={{color:"white"}}>23</div>
                  </div>
                  {/*//app-card-body*/}
                  <a className="app-card-link-mask" href="#" />
                </div>
                {/*//app-card*/}
              </div>
              {/*//col*/}
              <div className="col-6 col-lg-3">
                <div className="app-card app-card-stat shadow-sm h-100" style={{backgroundColor:"red"}}>
                  <div className="app-card-body p-3 p-lg-4">
                    <h4 className="stats-type mb-1" style={{color:"white"}}>Damaged berries</h4>
                    <div className="stats-figure" style={{color:"white"}}>600</div>
                  </div>
                  {/*//app-card-body*/}
                  <a className="app-card-link-mask" href="#" />
                </div>
                {/*//app-card*/}
              </div>
              {/*//col*/}
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
        <div className="col-12 col-lg-6">
                <div className="app-card app-card-stats-table h-100 shadow-sm">
                  <div className="app-card-header p-3">
                    <div className="row justify-content-between align-items-center">
                      <div className="col-auto">
                        <h4 className="app-card-title">Grading Data</h4>
                      </div>
                    </div>
                    {/*//row*/}
                  </div>
                  {/*//app-card-header*/}
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
                    {/*//table-responsive*/}
                  </div>
                  {/*//app-card-body*/}
                </div>
                {/*//app-card*/}
              </div>
           
          </div>
          {/*//container-fluid*/}
        </div>
      </div>
    )
}

export default Dash