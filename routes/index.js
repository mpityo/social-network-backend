const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).json({ message: 'Error - cannot find route '});
});

module.exports = router;
