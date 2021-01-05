import React from 'react';

class KpiCards extends React.Component {
  render() {
    return (
      <div className="top-container-inner">
        <div className="kpi-card" id="kpi-1">
          <div className="card-inner" id="card-1">
            <div className="inner-text">
              <span className="data-text">5</span>
              <span className="title-text">Propiedades</span>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="card-inner" id="card-2">
            <div className="inner-text">
              <span className="data-text">164</span>
              <span className="title-text">Visitas</span>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="card-inner" id="card-3">
            <div className="inner-text">
              <span className="data-text">2</span>
              <span className="title-text">Leads</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default KpiCards