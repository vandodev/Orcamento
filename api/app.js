const express = require('express');
const app = express();

app.get('/orcamento', function (req,res){
    res.send('hello world');
})

app.listen(8080, () =>{
    console.log('Servido iniciado com sucesso')
});