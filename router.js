const express = require('express')
const router = express.Router()

const dados = {
    produtos: [
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
    ]
}

// processar o corpo da requisição e colocar os dados em req.body
router.use (express.json())

//---------------------------------------------- API
router.get('/produtos', (req, res) => {
    res.status(200).json(dados.produtos)
})

router.get('/produtos/:id', (req, res) => {
    const id = parseInt (req.params.id)
    const idx = dados.produtos.findIndex (p => p.id === id)
    if(dados.produtos[idx])
        res.status(200).json(dados.produtos[idx])
    else
        res.status(404).send('Product not found')
})

router.post('/produtos', (req, res) => {
    const id = parseInt (req.params.id)
    const product = {
        id: id,
        ...req.body
    }
    dados.produtos.push(product)
    res.status(201).json(product)
})

router.put('/produtos/:id', (req, res) => {
    const id = parseInt (req.params.id)
    const idx = dados.produtos.findIndex (p => p.id === id)
    dados.produtos[idx] = {
        ...dados.produtos[idx],
        ...req.body,
        id: req.params.id
    }

    res.status(200).json(dados.produtos[idx])
})

router.delete('/produtos/:id', (req, res) => {
    const id = parseInt (req.params.id)
    const idx = dados.produtos.findIndex (p => p.id === id)

    dados.produtos.splice(idx, 1);
    res.status(204).send();
})

module.exports = router