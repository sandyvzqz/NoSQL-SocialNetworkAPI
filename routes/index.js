const router = require('express').Router();
const apiRoutes= require('./api');

router.use('/api', apiRoutes);

// logs error status
router.use((req, res)=>{
    res.status(404).send('404 Error');
});

//export the router 
module.exports = router;