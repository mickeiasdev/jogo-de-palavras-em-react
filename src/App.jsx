import "./App.css";
import { useState } from "react";
import ListarEstados from "./infra/ibgeEstados";

function App() {
    // Estado que armazena a palavra correta sorteada
    const [palavra, setPalavra] = useState("");
    // Estado que armazena a palavra embaralhada
    const [embaralhada, setEmbaralhada] = useState("");
    // Estado que armazena o resultado (mensagem: correto ou errado)
    const [resultado, setResultado] = useState("");

    // Função para iniciar uma nova rodada do jogo
    const heandleJogar = async () => {
        // Lista de palavras para o jogo
        const palavras = await ListarEstados(); // Chama a função para listar os estados

        // Sorteia uma palavra aleatória
        const index = Math.floor(Math.random() * palavras.length);
        const sorteada = palavras[index].toUpperCase(); // Converte para maiúsculas

        // Embaralha as letras da palavra sorteada
        const embaralhada = sorteada
            .split("") // divide em letras
            .sort(() => Math.random() - 0.5) // embaralha aleatoriamente
            .join(""); // junta novamente em uma string

        console.log(embaralhada + " - " + sorteada);

        // Atualiza os estados com a nova rodada
        setEmbaralhada(
            embaralhada
                .normalize("NFD")
                .replace(/\p{M}/gu, "")
                .replaceAll(" ", '"')
        );
        setPalavra(sorteada);
        setResultado(""); // limpa o resultado anterior
    };

    // Função para validar o palpite do usuário
    const heandleValidar = () => {
        // Converte o palpite para maiúsculas e remove acentos
        const palpite = document
            .getElementById("palpite")
            .value.toUpperCase()
            .normalize("NFD")
            .replace(/\p{M}/gu, "");
        // Verifica se o palpite está correto
        if (palpite === palavra.normalize("NFD").replace(/\p{M}/gu, "")) {
            setResultado("CORRETO!");
        } else {
            setResultado("ERRADO!");
        }

        // Limpa a palavra embaralhada após a validação
        setEmbaralhada("");
    };

    return (
        <div className="App">
            <h1>Jogo de Palavras</h1>
            <p>
                Neste jogo, você terá que adivinhar qual é a palavra que está
                <br />
                sendo apresentada com as letras embaralhadas.
            </p>
            <p className="alerta">
                Aspas duplas (") representam um espaço na palavra!
            </p>

            <button className="btnJogar" onClick={heandleJogar}>
                Nova Palavra
            </button>

            {embaralhada && (
                <div className="containerPalpite">
                    <h2>{embaralhada}</h2>
                    <div>
                        <input autoComplete="off" id="palpite" />
                        <button className="btnJogar" onClick={heandleValidar}>
                            Validar
                        </button>
                    </div>
                </div>
            )}

            {/* Exibe o resultado após a validação */}
            {resultado && (
                <div>
                    <p>
                        A palavra é <strong>{palavra}</strong> e o seu palpite está <strong>{resultado}</strong>!
                    </p>
                </div>
            )}
        </div>
    );
}

export default App;
