exports.handleServerError = (res, error) => {
    console.error('Internal server error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  };