export class Produto {
    private _idProduto?: number;
    private _idCategoria: number ;
    private _nome: string = '';
    private _vinculoImagem?: string;
    private _valor: number = 0;


    constructor(nome: string, idCategoria: number , valor: number, vinculoImagem?: string, idProduto?: number) {
        this._nome = nome;
        this._idCategoria = idCategoria;
        this._vinculoImagem = vinculoImagem;
        this._valor = valor;
        this._idProduto = idProduto;
    }

    get nome(): string {
        return this._nome;
    }

    get vinculoImagem(): string | undefined {
        return this._vinculoImagem;
    }

    get valor(): number {
        return this._valor;
    }

    get idProduto(): number | undefined {
        return this._idProduto;
    }

    get idCategoria(): number {
        return this._idCategoria;
    }

    set nome(value: string) {
        this.validarNome(value)
        this._nome = value;
    }

    set idProduto(value: number) {
        this.validarId(value);
        this._idProduto = value;
    }

    set idCategoria(value: number) {
        this.validarId(value);
        this._idCategoria = value;
    }

    set valor(value: number) {
        this.validarValor(value);
        this._idProduto = value;
    }

    set vinculoImagem(value: string) {
        this.validarPathImagem(value);
        this._vinculoImagem = value;
    }

    private validarNome(value: string) {
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('O campo nome é obrigatório e deve conter entre 3 e 45 caracteres');
        }
    }
    private validarPathImagem(value: string | null) {
        if (value && (value.trim().length > 255 || value.trim().length < 20)) {
            throw new Error('O path da imagem deve ter entre 20 e 255 caracteres');
        }
    }
    private validarValor(value: number) {
        if (!value || value < 0) {
            throw new Error('O valor do produto deve ser maior que 0 reais.')
        }
    }
    private validarId(value: number) {
        // Se não for null, deve ser um número positivo e válido
        if (isNaN(value) || value <= 0) {
            throw new Error('O ID deve ser um número válido e maior que zero');
        }
    }

    //Design Patern: Factory
    static criar(dados: any) {
        return new Produto(dados.nome, dados.idCategoria, dados.valor, dados.vinculoImagem, dados.idProduto);
    }
    static editar(id: number, dados: any) {
        return new Produto(dados.nome, dados.idCategoria, dados.valor, dados.vinculoImagem, id);
    }
}
