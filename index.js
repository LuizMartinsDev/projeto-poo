


const prompt = require('prompt-sync')()






class BancoDeDados {
    constructor() {
        this.listaDePessoas = [];
    }

    
    adicionar(pessoa) {
        const pessoaExistente = this.listaDePessoas.find(p => p.nome === pessoa.nome);
        if (pessoaExistente) {
            console.log("Erro: Não foi possível adicionar uma pessoa com o mesmo nome.");
            return;
        }
        this.listaDePessoas.push(pessoa);
        console.log("Pessoa adicionada com sucesso.");
    }

    

  
    listar() {
        console.log("Listando pessoas no BD...");
        if(this.listaDePessoas.length !== 0){
            this.listaDePessoas.forEach(pessoa => {
 // junção dos consoles.log em só um para ficar mais fácil de ler 
                console.log("Nome:", pessoa.nome, "Idade:", pessoa.idade, "Email:", pessoa.email);
            });
        } else{
 // adição de um console.log para informar que não existe dados no banco (antes só aparecia a mensagem de cima)
            console.log('Não existe nenhuma pessoa no BD')
        }
        
        
    }

   
    buscarPeloNome(nome) {
        const pessoa = this.listaDePessoas.find(p => p.nome === nome);
        if (pessoa) {
            console.log("Nome:", pessoa.nome, "Idade:", pessoa.idade, "Email:", pessoa.email);
            return pessoa;
        }
        console.log("Não existe uma pessoa com esse nome no banco de dados.");
        return null;
    }


  
    atualizar(nome, novaPessoa) {

        const index = this.listaDePessoas.findIndex(p => p.nome === nome);
        if (index !== -1) {
            this.listaDePessoas[index] = novaPessoa;
            console.log("Pessoa atualizada com sucesso.");
        } 
       
    }


  
    deletar(nome) {
        const index = this.listaDePessoas.findIndex(p => p.nome === nome);

        if (index !== -1) {
           
            this.listaDePessoas.splice(index, 1);
            console.log("Pessoa deletada com sucesso.");
        } else {
            console.log("Erro: Não foi possível localizar a pessoa para deletar.");
        }
    }
}


class Pessoa {
    #nome;
    #idade;
    #email;

    constructor(nome, idade, email){
        this.#nome = nome
        this.#idade = idade
        this.#email = email
    }

    get nome(){
        return this.#nome
    }

    set nome(novoNome){
        if(novoNome.length < 4){
            throw new Error('O nome deve ter pelo menos 4 letras')
        }
        const verificaLetras = /^[a-zA-Z]+$/;
        if(!verificaLetras.test(novoNome)){
            throw new Error('O tipo de dado recebido no campo nome não é valido')
        }

        this.#nome = novoNome
    }

    get idade(){
        return this.#idade
    }

    set idade(novaIdade){
        if(isNaN(novaIdade)){
            throw new Error('O tipo de dado recebido no campo idade não é valido')
        }
        if(novaIdade < 1 || novaIdade > 130){
            throw new Error('A idade da pessoa não é valida, precisa estar entre 1 e 130 anos')
        }
        this.#idade = novaIdade
    }

    get email(){
        return this.#email
    }

    set email(novoEmail){
        const validaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!validaEmail.test(novoEmail)){
            throw new Error('O email não é valido')
        }
        this.#email = novoEmail
    }
}

class Menu {
    constructor() {
        this.bancoDeDados = new BancoDeDados;
    }

    exibirMenu() {
// adição do do while para o menu rodar pelo menos uma vez e depois se o usuário não digitar 0 o menu não sumir
        let opcao;
        do{
        console.log("Menu:");
        console.log("1. Listar todas as pessoas");
        console.log("2. Adicionar uma pessoa");
        console.log("3. Atualizar uma pessoa");
        console.log("4. Buscar pelo nome");
        console.log("5. Deletar uma pessoa");
        console.log("0. Sair");

        opcao = parseInt(prompt("Digite a opção desejada: "));
        switch (opcao) {
            case 1:
                this.bancoDeDados.listar();
                break;
            case 2:
                this.adicionarPessoa();
                break;
            case 3:
                this.atualizarPessoa();
                break;
            case 4:
                this.buscarPeloNome();
                break;
            case 5:
                this.deletarPessoa();
                break;
            case 0:
                console.log("Saindo...");
                break;
            default:
                console.log("Opção inválida.");
                break;
        }
    } while(opcao !== 0)
    }

    adicionarPessoa() {
// puxando a classe pessoa e adicionando os dados nela
        const pessoa = new Pessoa();
        pessoa.nome = prompt("Digite o nome: ");
        pessoa.idade = parseInt(prompt("Digite a idade: "));
        pessoa.email = prompt("Digite o email: ");
        this.bancoDeDados.adicionar(pessoa);
    }

    atualizarPessoa() {
        const nomeAtual = prompt("Digite o nome da pessoa que deseja atualizar: ");
        const pessoaExistente = this.bancoDeDados.buscarPeloNome(nomeAtual);
        if (pessoaExistente) {
// puxando a classe pessoa e adicionando os dados nela
            const novaPessoa = new Pessoa();
            novaPessoa.nome = prompt("Digite o novo nome: ");
            novaPessoa.idade = parseInt(prompt("Digite a nova idade: "));
            novaPessoa.email = prompt("Digite o novo email: ");
            this.bancoDeDados.atualizar(nomeAtual, novaPessoa);
        }
    }

    buscarPeloNome() {
// simplificação do método pois o método da Classe do banco já estava fazendo a ação
        const nome = prompt("Digite o nome da pessoa: ");
        this.bancoDeDados.buscarPeloNome(nome);
    }

    deletarPessoa() {
        const nome = prompt("Digite o nome da pessoa que deseja deletar: ");
        this.bancoDeDados.deletar(nome);
    }
}

const novoMenu = new Menu();

novoMenu.exibirMenu()