export default async function ListarEstados() {
    let retorno = []
    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
     await fetch(url)
    .then(resposta => resposta.json())
    .then(estados => {
        estados.forEach(estado => {
            retorno.push(estado.nome);
        });
        console.log(retorno);
    })
    return retorno;
}
