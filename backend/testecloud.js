const ConectarCloud = require("./conectioncloud");

ConectarCloud()
    .then(() => {
        console.log("Teste concluído!");
        process.exit(0);
    })
    .catch(() => {
        process.exit(1);
    });