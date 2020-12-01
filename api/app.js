const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() =>{
    console.log("Conectado com sucesso");
}).catch((err) =>{
    console.log("Falha na conexão: " + err);
});

app.post('/orcamento',async (req,res) => {
    console.log(req.body);
    res.send('hello world');
})

app.listen(8080, () =>{
    console.log('Servido iniciado com sucesso')
});