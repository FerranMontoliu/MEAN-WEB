const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if(!err)
        console.log('[MongoDB] Connection OK.');
    else
        console.log('[MongoDB] Error: ' + JSON.stringify(err, undefined, 2));
});

require('./user.model');
require('./incidence.model');