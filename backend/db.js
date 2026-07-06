const mongoose = require('mongoose');
const dns = require('dns');

// Optional: Set custom DNS servers
dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]);

const username = 'user';
const password = 'whiteboard';

const url = `mongodb+srv://${username}:${password}@cluster0.dldikcz.mongodb.net/inky?retryWrites=true&w=majority&appName=Cluster0`;

const connectToDatabase = async () => {
    try { 
        await mongoose.connect(url);
        console.log('Connected to the database');
    } catch (err) {
        console.error('Error connecting to the database:');
        console.error(err);
    }
};

module.exports = connectToDatabase;