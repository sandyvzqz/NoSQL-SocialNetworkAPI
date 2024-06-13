// requiring mongoose for connection
const { connect, connection } = require('mongoose');

// connect to mongoose database
connect('mongodb://localhost:27017//social-network', {
    useFindAndModify: false,
    useNewURLParser: true,
    useUnifiedTopology: true
});

// enable mongo query logging 
mongoose.set('debug', true);

module.exports = connection; 