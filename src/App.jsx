import "./App.css";
import { useState } from "react";

function App() {
    // Estado que armazena a palavra correta sorteada
    const [palavra, setPalavra] = useState("");
    // Estado que armazena a palavra embaralhada
    const [embaralhada, setEmbaralhada] = useState("");
    // Estado que armazena o resultado (mensagem: correto ou errado)
    const [resultado, setResultado] = useState("");

    // Lista de palavras grandes usadas no jogo
    const palavras = [
        "universidade",
        "programação",
        "desenvolver",
        "computador",
        "processador",
        "infraestrutura",
        "responsável",
        "comunicação",
        "tecnologia",
        "automatizar",
        "inteligente",
        "identificador",
        "revolucionar",
        "conhecimento",
        "armazenamento",
        "implementação",
        "compreensão",
        "acessibilidade",
        "desempenho",
        "compatível",
    ];

    // Função para iniciar uma nova rodada do jogo
    const heandleJogar = () => {
        // Sorteia uma palavra aleatória
        const index = Math.floor(Math.random() * palavras.length);
        const sorteada = palavras[index];
        
        // Embaralha as letras da palavra sorteada
        const embaralhada = sorteada
            .split("")                        // divide em letras
            .sort(() => Math.random() - 0.5)  // embaralha aleatoriamente
            .join("");                        // junta novamente em uma string

        // Atualiza os estados com a nova rodada
        setEmbaralhada(embaralhada);
        setPalavra(sorteada);
        setResultado(""); // limpa o resultado anterior
    };

    // Função para validar o palpite do usuário
    const heandleValidar = () => {
        const palpite = document.getElementById("palpite").value;
        if (palpite === palavra) {
            setResultado("CORRETO!");
        } else {
            setResultado("ERRADO!");
        }

        // Limpa a palavra embaralhada após a validação
        setEmbaralhada("");
    };

    return (
        <div className="App">
            <h2>Jogo de Palavras</h2>
            <p>
                Neste jogo, você terá que adivinhar qual é a palavra que está
                sendo apresentada com as letras embaralhadas.
            </p>

            {/* Botão para iniciar o jogo */}
            <button onClick={heandleJogar}>Jogar</button>

            {/* Exibe a palavra embaralhada e o input de palpite */}
            {embaralhada && (
                <div>
                    <h4>{embaralhada}</h4>
                    <input id="palpite" />
                    <button onClick={heandleValidar}>Validar</button>
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
