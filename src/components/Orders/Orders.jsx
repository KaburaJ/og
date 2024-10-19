import React, { useState } from "react";

const Orders = () => {
  // Dummy data
  const [data] = useState([
    { batchId: "#001", quantity: 150, ripe: 80, unripe: 30, overripe: 20, damaged: 20, dominantGrade: "Grade I" },
    { batchId: "#002", quantity: 200, ripe: 100, unripe: 50, overripe: 30, damaged: 20, dominantGrade: "Grade I" },
    { batchId: "#003", quantity: 180, ripe: 90, unripe: 60, overripe: 20, damaged: 10, dominantGrade: "Grade I" },
    { batchId: "#004", quantity: 120, ripe: 60, unripe: 30, overripe: 20, damaged: 10, dominantGrade: "Grade I" },
    { batchId: "#005", quantity: 160, ripe: 70, unripe: 50, overripe: 30, damaged: 10, dominantGrade: "Grade I" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Add your search functionality here
    console.log("Searching for:", searchTerm);
  };

  const filteredData = data.filter((entry) => entry.batchId.includes(searchTerm));

  return (
    <>
      {/*//app-header*/}
      <div className="app-wrapper">
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
                          <button type="submit" className="btn app-btn-secondary">
                            Search
                          </button>
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
                    <div className="col-auto">
                      <a className="btn app-btn-secondary" href="#">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-download me-1"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
                          />
                          <path
                            fillRule="evenodd"
                            d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
                          />
                        </svg>
                        Download CSV
                      </a>
                    </div>
                  </div>
                  {/*//row*/}
                </div>
                {/*//table-utilities*/}
              </div>
              {/*//col-auto*/}
            </div>
            {/*//row*/}
            <div className="app-card app-card-orders-table shadow-sm mb-5">
              <div className="app-card-body">
                <div className="table-responsive">
                  <table className="table app-table-hover mb-0 text-left">
                    <thead>
                      <tr>
                        <th className="cell">Batch ID</th>
                        <th className="cell">Quantity of Berries</th>
                        <th className="cell">Ripe</th>
                        <th className="cell">Unripe</th>
                        <th className="cell">Overripe</th>
                        <th className="cell">Damaged</th>
                        <th className="cell">Dominant Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((entry) => (
                        <tr key={entry.batchId}>
                          <td className="cell">{entry.batchId}</td>
                          <td className="cell">{entry.quantity}</td>
                          <td className="cell">{entry.ripe}</td>
                          <td className="cell">{entry.unripe}</td>
                          <td className="cell">{entry.overripe}</td>
                          <td className="cell">{entry.damaged}</td>
                          <td className="cell">{entry.dominantGrade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/*//table-responsive*/}
              </div>
              {/*//app-card-body*/}
            </div>
            {/*//app-card*/}
            <nav className="app-pagination">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <a
                    className="page-link"
                    href="#"
                    tabIndex={-1}
                    aria-disabled="true"
                  >
                    Previous
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
            {/*//app-pagination*/}
          </div>
          {/*//container-fluid*/}
        </div>
      </div>
      {/*//app-wrapper*/}
      {/* Javascript */}
      {/* Page Specific JS */}
    </>
  );
};

export default Orders;
