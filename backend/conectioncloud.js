const dns = require("dns");
const mongoose = require("mongoose");

require("dotenv").config();

dns.setServers(["1.1.1.1", "8.8.8.8"]);

async function ConectarCloud() {

    try {

        await mongoose.connect(process.env.URL_MONGO_CLOUD);

        console.log("MongoDB Atlas conectado com sucesso!");

    } catch (error) {

        console.error("Erro ao conectar no MongoDB Atlas:", error);

    }

}

module.exports = ConectarCloud;