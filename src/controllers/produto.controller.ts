import { Request, Response } from "express";
import produtoRepository from "../repositories/produtoRepository";
import { Produto } from "../models/Produto";


const produtoController = {
    criar: async (req: Request, res: Response) => {
        let { nomeProduto, preco, idCategoria, valor } = req.body;

        nomeProduto = String(nomeProduto);
        preco = Number(preco);
        idCategoria = Number(idCategoria);
        valor = Number(valor);

        if (!req.file) {
            return res.status(400).json({
                message: 'Arquivo de imagem não enviado.'
            });
        }

        const caminhoImagem : string = `src/uploads/images/${req.file.filename}`;
        const produto = Produto.criar({nomeProduto, idCategoria, valor, caminhoImagem})

        const result = await produtoRepository.create(produto);
    

        return res.status(201).json({
            message: 'Registro inserido com sucesso.',
            produto: result,
            file: {
                filename: req.file.filename,
                size: req.file.size,
                mimetype: req.file.mimetype,
            }
        });
    },
    atualizar: async (Req: Request, Res: Response) => {
        try {
            const id: number = Number(Req.query.id);
            const { nome, descricao } = Req.body;
            const produto = Produto.editar(id, { nome, descricao });
            const result = await produtoRepository.update(produto);
            return Res.status(200).json({ result });

        } catch (error: any) {
            console.error(error);
            Res.status(500).json({ message: 'Ocorreu um erro no servidor.', error: error.message })
        }
    },
    excluir: async (Req: Request, Res: Response) => {
        try {
            const id: number = Number(Req.params.id);
            const result = await produtoRepository.delete(id);
            return Res.status(200).json({ result });
        } catch (error: any) {
            console.error(error);
            Res.status(500).json({ message: 'Ocorreu um erro no servidor.', error: error.message })
        }
    },
    selecionar: async (req: Request, res: Response) => {
        try {
            const { nome, id } = req.body;

            const result = await produtoRepository.read(nome, undefined);

            if (result.length === 0) {
                const contexto = id ? `com o id ${id}` : (nome ? `com o nome "${nome}"` : 'cadastrada');
                return res.status(200).json({
                    message: `Não há nenhum produto ${contexto} no banco de dados.`
                });
            }

            if (result.length == 0) {
                return res.status(200).json({ message: 'Não há nenhum produto com essa descrição.' })
            }

            res.status(200).json({ message: 'Requisição bem sucedida', data: result });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', error: error.message })
        }
    }
}

export default produtoController;