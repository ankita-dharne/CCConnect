import React from 'react';
import './Analytics.css'
import { Layout } from '../Layout';

const AnalyticsDashboard = () => {
  return (
    <Layout>
    <div className="dashboard-container">
      <h1>Sentimental Analysis Dashboard</h1>
      <div className="image-item">
          <img src='/sentiment_analysis_plot.png' alt="Chart" className="image-chart" />
        </div>
        <div className="image-item">
          <img src={'/model_accuracy.png'} alt="Accuracy" className="image-accuracy" />
        </div>
    </div>
    </Layout>
  );
};

export default AnalyticsDashboard;