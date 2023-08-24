const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const { loadPlanets } = require('./models/planets.model');


const PORT = process.env.PORT || 8000;
const MONGO_URL = 'mongodb+srv://sourabhvishnoi05:sourabh0505@cluster0.rvn4gs4.mongodb.net/';

const server = http.createServer(app);

mongoose.connection.once('open',()=>{
    console.log('MongoDB connected');
})

mongoose.connection.on('error',(e) => {
    console.log(e);
})

async function startServer(){
    await mongoose.connect(MONGO_URL,{
        // useNewUrlParser: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
        // useUnifiedTopology: true,
    })
    await loadPlanets();
    server.listen(PORT,()=>{
        console.log(`Server is running on Port ${PORT}...`);
    })
}
startServer()
