import React from "react";
import "./Analytics.css";
import { Layout } from "../Layout";

const AnalyticsDashboard = () => {
  return (
    <Layout>
      <div className="dashboard-container">
        <h1>Sentimental Analysis Dashboard</h1>
        <div className="image-container">
          <div className="image-left-item">
            <img
              src="/sentiment_analysis.gif"
              alt="Chart"
              className="image-chart"
            />
          </div>
          <div className="image-item">
            <img
              src={"/new_sentiment_analysis_plot.png"}
              alt="Accuracy"
              className="image-accuracy"
            />
          </div>
        </div>
        <div className="image-accuracy">
        <img
          src={"/sentiment_analysis_trace_sim.gif"}
          alt="Accuracy"
          className="image-accuracy"
        />
      </div>
      
      </div>
    </Layout>
  );
};

export default AnalyticsDashboard;
