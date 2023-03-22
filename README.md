Exercicio de fixação sobre api restfull

rotas GET
/ping -> faz um ping apenas para testar a rota
/random -> rota de teste para retornar um numero aleatório
/nome/:nome -> retorna todas as frases previamente cadastradas pelo nome do autor
/frases -> retorna todas as frases cadastradas no banco
/frases/aleatoria -> retorna  uma frase aleatória
/frases/:id -> retorna uma frase a partir de um id fornecido

///////////////////////////////////////////////////////////////////////////////////////

rotas post
/frases -> cadastra uma nova frase 
campos obrigatórios -> txt : string, author : string

/upload -> rota de teste de upload de arquivo

///////////////////////////////////////////////////////////////////////////////////////

rota put
/frases/:id -> altera os dados de uma frase 
campos obrigatórios -> txt : string, author : string

///////////////////////////////////////////////////////////////////////////////////////

rota delete
/frases/:id -> exclui uma frase 

///////////////////////////////////////////////////////////////////////////////////////


o arquivo do banco com estrutura de tabela e alguns dados pré-cadastrados é phrases.sql


após clonar o repositório acessar a pasta e executar um npm install para instalar as dependencias
e um npm run start-dev para iniciar o projeto