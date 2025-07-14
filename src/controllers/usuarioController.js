var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var autor = req.body.autorServer;
    var genero = req.body.generoServer;

    if (autor == undefined) {
        res.status(400).send("Seu autor está undefined!");
    } else if (genero == undefined) {
        res.status(400).send("Seu genero está undefined!");
    } else {

        usuarioModel.autenticar(autor, genero)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                            .then((resultadoAquarios) => {
                                if (resultadoAquarios.length > 0) {
                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        autor: resultadoAutenticar[0].autor,
                                        titulo: resultadoAutenticar[0].titulo,
                                        genero: resultadoAutenticar[0].genero,
                                        aquarios: resultadoAquarios
                                    });
                                } else {
                                    res.status(204).json({ aquarios: [] });
                                }
                            })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("autor e/ou genero inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e genero!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var titulo = req.body.tituloServer;
    var autor = req.body.autorServer;
    var genero = req.body.generoServer;
    var qtdEStoque = req.body.qtdEstoqueServer;
    var precoCompra = req.body.precoCompraServer;
    var precoVenda = req.body.precoVendaServer


    // Faça as validações dos valores
    if (titulo == undefined) {
        res.status(400).send("Seu titulo está undefined!");
    } else if (autor == undefined) {
        res.status(400).send("Seu autor está undefined!");
    } else if (genero == undefined) {
        res.status(400).send("Sua genero está undefined!");
    } else if (qtdEStoque == undefined) {
        res.status(400).send("Seu estoque está undefined!");
    } else if (precoCompra == undefined) {
        res.status(400).send("O preço de compra está undefined!");
    } else if (precoVenda == undefined) {
        res.status(400).send("O preço de venda está undefined!");
    }
    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(titulo, autor, genero, qtdEStoque, precoCompra, precoVenda)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
}