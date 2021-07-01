module.exports = {
    port: process.env.PORT || 3000,
    // db: process.env.MONGODB || 'mongodb://localhost:27017/mytest2',
    db: process.env.MONGODB || 'mongodb+srv://cesarramirez:Isc17cesar@cluster0.reo9h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    urlParser: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
}