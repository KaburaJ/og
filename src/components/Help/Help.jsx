import React, { useState } from "react";

const Help = () => {
    // State to keep track of the currently opened FAQ
    const [openFAQ, setOpenFAQ] = useState(null);

    // Function to handle the click event
    const handleToggle = (index) => {
        setOpenFAQ(openFAQ === index ? null : index); // Toggle the FAQ
    };

    return (
        <>
            {/*//app-header*/}
            <div className="app-wrapper">
                <div className="app-content pt-3 p-md-3 p-lg-4">
                    <div className="container-xl">
                        <h1 className="app-page-title">Help Center</h1>
                        <div className="app-card app-card-accordion shadow-sm mb-4">
                            <div className="app-card-header p-4 pb-2  border-0">
                                <h4 className="app-card-title">FAQs</h4>
                            </div>
                            {/*//app-card-header*/}
                            <div className="app-card-body p-4 pt-0">
                                <div
                                    id="faq1-accordion"
                                    className="faq1-accordion faq-accordion accordion"
                                >
                                    {[
                                        {
                                            question: "What does the dashboard show me?",
                                            answer: "The dashboard provides a comprehensive view of the coffee sorting device's performance. You can monitor real-time data such as the sorting efficiency, defect rates, coffee grade distribution, and machine status. It also offers historical data analysis to track trends and optimize operations."
                                        },
                                        {
                                            question: "How do I access detailed sorting statistics?",
                                            answer: "Navigate to the 'Sorting Overview' tab to view detailed sorting statistics, including the volume of coffee sorted by grade, defects identified, and overall performance metrics. You can filter this data by date and coffee type for more specific insights."
                                        },
                                        {
                                            question: "How do I export the data for external analysis?",
                                            answer: "To export data, click on the 'Export' button located in the upper right corner of the dashboard. You can choose from different file formats (CSV, Excel, etc.) and select the date range you wish to export. This allows for further analysis outside the application."
                                        },
                                        {
                                            question: "Can I customize the visualizations to meet my needs?",
                                            answer: "Yes! You can customize graphs and charts on the dashboard by selecting specific variables, adjusting time ranges, or changing the chart type. Use the settings icon on each visualization to configure it according to your preferences."
                                        },
                                        {
                                            question: "How do I troubleshoot errors in the data display?",
                                            answer: "If you encounter issues with data display, such as missing or incomplete data, check your device's connectivity first. Ensure the coffee sorting device is properly synced with the dashboard. If the issue persists, contact support or check the logs in the 'System Status' tab for potential hardware issues."
                                        },
                                        {
                                            question: "How do I track the performance of multiple devices?",
                                            answer: "The dashboard allows you to monitor multiple coffee sorting devices simultaneously. Go to the 'Device Management' section to add or select devices. Each device's performance will be displayed in separate tabs or windows for easy comparison and analysis."
                                        },
                                    ].map((faq, index) => (
                                        <div className="accordion-item" key={index}>
                                            <h2 className="accordion-header" id={`faq1-heading-${index}`}>
                                                <button
                                                    className="accordion-button btn btn-link"
                                                    type="button"
                                                    onClick={() => handleToggle(index)} // Trigger toggle on button click
                                                    aria-expanded={openFAQ === index} // Update aria-expanded
                                                >
                                                    {faq.question}
                                                </button>
                                            </h2>
                                            <div
                                                className={`accordion-collapse border-0 ${openFAQ === index ? "show" : "collapse"}`} // Show or hide based on state
                                                aria-labelledby={`faq1-heading-${index}`}
                                            >
                                                <div className="accordion-body text-start p4">
                                                    {faq.answer}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/*//faq1-accordion*/}
                            </div>
                            {/*//app-card-body*/}
                        </div>
                        {/*//app-card*/}
                        <div className="row g-4">
                            <div className="col-12 col-md-6">
                                <div className="app-card app-card-basic d-flex flex-column align-items-start shadow-sm">
                                    <div className="app-card-header p-3 border-bottom-0">
                                        <div className="row align-items-center gx-3">
                                            <div className="col-auto">
                                                <div className="app-icon-holder icon-holder-mono">
                                                    <svg
                                                        width="1em"
                                                        height="1em"
                                                        viewBox="0 0 16 16"
                                                        className="bi bi-headset"
                                                        fill="currentColor"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M8 1a5 5 0 0 0-5 5v4.5H2V6a6 6 0 1 1 12 0v4.5h-1V6a5 5 0 0 0-5-5z"
                                                        />
                                                        <path d="M11 8a1 1 0 0 1 1-1h2v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V8zM5 8a1 1 0 0 0-1-1H2v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V8z" />
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M13.5 8.5a.5.5 0 0 1 .5.5v3a2.5 2.5 0 0 1-2.5 2.5H8a.5.5 0 0 1 0-1h3.5A1.5 1.5 0 0 0 13 12V9a.5.5 0 0 1 .5-.5z"
                                                        />
                                                        <path d="M6.5 14a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1z" />
                                                    </svg>
                                                </div>
                                                {/*//icon-holder*/}
                                            </div>
                                            {/*//col*/}
                                            <div className="col-auto">
                                                <h4 className="app-card-title">Need more help?</h4>
                                            </div>
                                            {/*//col*/}
                                        </div>
                                        {/*//row*/}
                                    </div>
                                    {/*//app-card-header*/}
                                    <div className="app-card-body px-4">
                                        <div className="intro mb-3">
                                            Feel free to reach out to us.
                                        </div>
                                        <ul className="list-unstyled">
                                            <li>
                                                <strong>Tel:</strong> 0123 456 789
                                            </li>
                                            <li>
                                                <strong>Email:</strong> <a href="#">support@coffeesort.com</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/*//app-card*/}
                            </div>
                            {/*//col*/}
                            {/*//col*/}
                        </div>
                        {/*//row*/}
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

export default Help;
