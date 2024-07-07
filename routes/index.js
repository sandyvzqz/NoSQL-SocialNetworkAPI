const router = require('express').Router();
const apiRoutes= require('./api');

router.use('/api', apiRoutes);

// logs error status
router.use((req, res)=>{
    res.send('An error occurred.');
});

//export the router 
module.exports = router;