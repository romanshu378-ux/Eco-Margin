// Simple health check endpoint to verify the API is running
exports.checkHealth = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'EcoMargin API is running',
    timestamp: new Date().toISOString()
  });
};
