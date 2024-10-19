import logo from './images/logo.png';
import './App.css';
import { useState, useEffect } from 'react';
import Dash from './components/Dash/Dash';
import Charts from './components/Charts/Charts';
import Help from './components/Help/Help';
import Orders from './components/Orders/Orders';
import { Route, Router, Routes } from 'react-router-dom';


function App() {
  const [render, setRender] = useState("Dash");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false); // State for side panel visibility

  // Responsive side panel function
  const responsiveSidePanel = () => {
    let w = window.innerWidth;
    const sidePanel = document.getElementById('app-sidepanel');
    if (w >= 1200) {
      sidePanel.classList.remove('sidepanel-hidden');
      sidePanel.classList.add('sidepanel-visible');
    } else {
      sidePanel.classList.remove('sidepanel-visible');
      sidePanel.classList.add('sidepanel-hidden');
    }
  };

  // Toggler function for opening/closing side panel
  const handleSidePanelToggle = (e) => {
    e.preventDefault();
    const sidePanel = document.getElementById('app-sidepanel');
    if (sidePanel.classList.contains('sidepanel-visible')) {
      sidePanel.classList.remove('sidepanel-visible');
      sidePanel.classList.add('sidepanel-hidden');
      setIsSidePanelOpen(false);
    } else {
      sidePanel.classList.remove('sidepanel-hidden');
      sidePanel.classList.add('sidepanel-visible');
      setIsSidePanelOpen(true);
    }
  };

  // Close panel handler (for the close button and background overlay)
  const handleSidePanelClose = (e) => {
    e.preventDefault();
    const sidePanel = document.getElementById('app-sidepanel');
    sidePanel.classList.remove('sidepanel-visible');
    sidePanel.classList.add('sidepanel-hidden');
    setIsSidePanelOpen(false); // Close side panel
  };

  // Mobile search toggle
  const handleMobileSearchToggle = () => {
    const searchBox = document.querySelector('.app-search-box');
    const searchMobileTriggerIcon = document.querySelector('.search-mobile-trigger-icon');
    searchBox.classList.toggle('is-visible');
    
    if (searchMobileTriggerIcon.classList.contains('fa-magnifying-glass')) {
      searchMobileTriggerIcon.classList.remove('fa-magnifying-glass');
      searchMobileTriggerIcon.classList.add('fa-xmark');
    } else {
      searchMobileTriggerIcon.classList.remove('fa-xmark');
      searchMobileTriggerIcon.classList.add('fa-magnifying-glass');
    }
  };

  // Use effect to initialize responsiveness and event listeners
  useEffect(() => {
    // Set up responsive side panel on load and resize
    window.addEventListener('load', responsiveSidePanel);
    window.addEventListener('resize', responsiveSidePanel);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('load', responsiveSidePanel);
      window.removeEventListener('resize', responsiveSidePanel);
    };
  }, []);

  return (
    <>
    {/* <Router>
      <Routes>
        <Route path="/" element={<Orders />} />
        <Route path="/charts/:batchId" element={<Charts />} />
      </Routes>
    </Router> */}
      <header className="app-header fixed-top">
        <div className="app-header-inner">
          <div className="container-fluid py-2">
            <div className="app-header-content">
              <div className="row justify-content-between align-items-center">
                <div className="col-auto">
                  <a
                    id="sidepanel-toggler"
                    className="sidepanel-toggler d-inline-block d-xl-none"
                    href="#"
                    onClick={handleSidePanelToggle} // Toggle side panel on click
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={30}
                      height={30}
                      viewBox="0 0 30 30"
                      role="img"
                    >
                      <title>Menu</title>
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeMiterlimit={10}
                        strokeWidth={2}
                        d="M4 7h22M4 15h22M4 23h22"
                      />
                    </svg>
                  </a>
                </div>
                <div className="search-mobile-trigger d-sm-none col" onClick={handleMobileSearchToggle}>
                  <i className="search-mobile-trigger-icon fa-solid fa-magnifying-glass"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="app-sidepanel"
          className={`app-sidepanel ${isSidePanelOpen ? 'is-open' : ''}`} // Control open/close state
        >
          <div id="sidepanel-drop" className="sidepanel-drop" onClick={handleSidePanelClose} />
          <div className="sidepanel-inner d-flex flex-column">
            <a
              href="#"
              id="sidepanel-close"
              className="sidepanel-close d-xl-none"
              onClick={handleSidePanelClose} // Close the panel when close icon is clicked
            >
              ×
            </a>
            <div className="app-branding">
              <a className="app-logo">
                <img className="logo-icon me-2" src={logo} alt="logo" style={{width:"50px", height:"50px"}} />
              </a>
            </div>
          {/*//app-branding*/}
          <nav id="app-nav-main" className="app-nav app-nav-main flex-grow-1">
            <ul className="app-menu list-unstyled accordion" id="menu-accordion">
              <li className="nav-item">
                {/*//Bootstrap Icons: https://icons.getbootstrap.com/ */}
                <a className="nav-link active" onClick={() => setRender("Dash")}>
                  <span className="nav-icon">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-house-door"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4h3.5V7.707L8 2.207l-5.5 5.5z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                      />
                    </svg>
                  </span>
                  <span className="nav-link-text">Overview</span>
                </a>
                {/*//nav-link*/}
              </li>
              {/*//nav-item*/}
              <li className="nav-item">
                {/*//Bootstrap Icons: https://icons.getbootstrap.com/ */}
                <a className="nav-link" onClick={() => setRender("Orders")}>
                  <span className="nav-icon">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-card-list"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"
                      />
                      <circle cx="3.5" cy="5.5" r=".5" />
                      <circle cx="3.5" cy={8} r=".5" />
                      <circle cx="3.5" cy="10.5" r=".5" />
                    </svg>
                  </span>
                  <span className="nav-link-text">Batches</span>
                </a>
                {/*//nav-link*/}
              </li>
              {/*//nav-item*/}
              <li className="nav-item">
                {/*//Bootstrap Icons: https://icons.getbootstrap.com/ */}
                <a className="nav-link" onClick={() => setRender("Charts")}>
                  <span className="nav-icon">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-bar-chart-line"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z"
                      />
                    </svg>
                  </span>
                  <span className="nav-link-text">Batches' Visuals</span>
                </a>
                {/*//nav-link*/}
              </li>
              {/*//nav-item*/}
              <li className="nav-item">
                {/*//Bootstrap Icons: https://icons.getbootstrap.com/ */}
                <a className="nav-link" onClick={() => setRender("Help")}>
                  <span className="nav-icon">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-question-circle"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                      />
                      <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                    </svg>
                  </span>
                  <span className="nav-link-text">Help</span>
                </a>
                {/*//nav-link*/}
              </li>
              {/*//nav-item*/}
            </ul>
            {/*//app-menu*/}
          </nav>
          {/*//app-sidepanel-footer*/}
        </div>
        {/*//sidepanel-inner*/}
      </div>
      {/*//app-sidepanel*/}
    </header>
    {render === "Dash" && <Dash />}
      {render === "Charts" && <Charts />}
      {render === "Help" && <Help />}
      {render === "Orders" && <Orders />}
  </>
  
  );
}

export default App;
