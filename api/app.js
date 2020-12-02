const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('./models/Orcamento');
const Orcamento = mongoose.model('Orcamento');

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
    await Orcamento.create(req.body, (err) =>{
        if(err) return res.status(400).json({
            error:true,
            message:"Erro: Solicitação de orçamento não enviada"
        });
    });
    
   
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5a612e8c1cf510", // generated ethereal user
          pass: "6d8ae74515aa00", // generated ethereal password
        },
      });

      var emailhtml = 'Prezado(a)<br><br>Recebi a solicitação de orçamento.<br><br>Em breve será encaminhado o orçamento <br><br>';

      var emaitexto = 'Prezado(a) \n\n Recebi a solicitação de orçamento. \n\n Em breve será encaminhado o orçamento  \n\n ';

      var emailSendInfo = {
        from: '"Evandro" <7f7ee9597e-a44502@inbox.mailtrap.io>', // sender address
        to: req.body.email, // list of receivers
        subject: "Recebi a solicitação de orçamento ✔", // Subject line
        text: emaitexto, // plain text body
        html: emailhtml, // html body
      }

      await transport.sendMail(emailSendInfo, function(err){
        if(err) return res.status(400).json({
            error:true,
            message:"Erro: Solicitação de orçamento não enviada"
        });

        return res.json({
            error:false,
            message:"Solicitação de orçamento enviado com sucesso"
        });
        
      });

    return res.json({
        error:false,
        message:"Solicitação de orçamento enviado com sucesso"
    });
});

app.listen(8080, () =>{
    console.log('Servido iniciado com sucesso')
});