// EcoMargin — Lightweight Health Controller for UptimeRobot & Render Monitoring
// src/controllers/health.controller.js

exports.checkHealth = (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    service: 'EcoMargin Backend',
    timestamp: new Date().toISOString()
  });
};
