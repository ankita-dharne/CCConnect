import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Analytics.css'
import { Layout } from '../Layout';

const AnalyticsDashboard = () => {
  const [data, setData] = useState([]);
  const [animationSrc, setAnimationSrc] = useState('');


  useEffect(() => {
    // Fetch data
    axios.get('/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    // Fetch animation GIF
    axios.get('/api/animation', { responseType: 'arraybuffer' })
      .then(response => {
        const blob = new Blob([response.data], { type: 'image/gif' });
        const src = URL.createObjectURL(blob);
        setAnimationSrc(src);
      })
      .catch(error => {
        console.error('Error fetching animation:', error);
      });
  }, []);
  
  return (
    <Layout>
    <div className="dashboard-container">
      <h1>Sentimental Analysis Dashboard</h1>
      <div className="image-item">
          <img src='/sentiment_analysis.gif' alt="Chart" className="image-chart" />
        </div>
        <div className="image-item">
          <img src={'/model_accuracy.png'} alt="Accuracy" className="image-accuracy" />
        </div>
    </div>
    </Layout>
  );
};

export default AnalyticsDashboard;