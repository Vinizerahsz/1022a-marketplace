import mysql , { Connection, RowDataPacket } from 'mysql2/promise'

class BancoMysql{
    connection:Connection|null = null
    
    async criarConexao(){
        this.connection = await mysql.createConnection({
            host: "banco1022a-estudante-612d.h.aivencloud.com",
            user: "avnadmin",
            password: "AVNS_xtMVt32IN3kVfgieyzY",
            database: "defaultdb",
            port: 20310
        })
    }
    async consultar(query:string,params?:any[]){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result] = await this.connection.query(query,params)
        return result
    }
    async finalizarConexao(){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        await this.connection.end()
    }
    async listar(){
        return await this.consultar("SELECT * FROM produtos")
    }
    async inserir(produto:{id:number,nome:string,descricao:string,preco:string,imagem:string,modelo:string,marca:string}){
        return await this.consultar("INSERT INTO produtos VALUES (?,?,?,?,?,?)",[produto.id,produto.nome,produto.descricao,produto.preco,produto.imagem,produto.modelo,produto.marca])
    }
    async excluir(id:string){
        return await this.consultar("DELETE FROM produtos WHERE id = ?",[id])
    }
    async alterar(id:string,produto:{nome:string,descricao:string,preco:string,imagem:string,modelo:string,marca:string}){
        return await this.consultar("UPDATE produtos SET nome=?, descricao=?, preco=?, imagem=?, modelo=?, marca=? WHERE id=?", [produto.nome, produto.descricao, produto.preco, produto.imagem, produto.modelo, produto.marca, id])
    }
    async listarPorId(id:string){
        const result = await this.consultar("SELECT * FROM produtos WHERE id = ?",[id]) as RowDataPacket[]
        return result[0]
    }
}

export default BancoMysql
