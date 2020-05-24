const mongooose = require('mongoose');
module.exports = async function(key){
    try{
        await mongooose.connect(key, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('MongoDB connected');
    }catch(e){
        console.log(e);
    }
};