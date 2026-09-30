var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Oi, mundo :-)');
});

function soma(a, b) {
  return a + b;
}

function subtracao(a, b) {
  return a - b;
}

function multiplicacao(a, b) {
  return a * b;
}

function divisao(a, b) {
  return a / b;
}

function obterNumero(valor) {
  if (typeof valor === 'number' && Number.isFinite(valor)) {
    return valor;
  }

  if (typeof valor === 'string' && valor.trim() !== '') {
    var numero = Number(valor);
    if (Number.isFinite(numero)) {
      return numero;
    }
  }

  return null;
}

function criarRota(operacao, nome, calcular) {
  app.post('/' + operacao, function (req, res) {
    var a = obterNumero(req.body && req.body.a);
    var b = obterNumero(req.body && req.body.b);

    if (a === null || b === null) {
      return res.status(400).json({ erro: 'Envie os valores numéricos a e b.' });
    }

    if (operacao === 'divisao' && b === 0) {
      return res.status(400).json({ erro: 'Não é possível dividir por zero.' });
    }

    var resultado = calcular(a, b);
    res.send('O resultado da ' + nome + ' de ' + a + ' e ' + b + ' é ' + resultado);
  });
}

criarRota('soma', 'soma', soma);
criarRota('subtracao', 'subtração', subtracao);
criarRota('multiplicacao', 'multiplicação', multiplicacao);
criarRota('divisao', 'divisão', divisao);

var port = 3001;

app.listen(port, function () {
  console.log('App de Exemplo escutando na porta http://localhost:' + port + '/');
});