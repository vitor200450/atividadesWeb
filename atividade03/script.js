const input = document.querySelector("input");
const button = document.querySelector("button");
const result = document.querySelector(".result-container");

// Garantir que apenas números sejam inseridos no input
input.addEventListener("input", () => {
    let value = input.value.replace(/\D/g, "");
    if (value.length > 5) {
        value = value.slice(0, 5) + "-" + value.slice(5, 8);
    }
    input.value = value;
});

button.addEventListener("click", () => {
    const value = input.value.trim();

    if (value === "") {
        result.innerHTML = "Campo vazio!";
        result.style.color = "red";
    } else {
        fetch(`https://viacep.com.br/ws/${value}/json/`).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    if (data.erro) {
                        result.innerHTML = "CEP não encontrado!";
                        result.style.color = "red";
                    } else {
                        result.innerHTML = `
                            <p><strong>CEP:</strong> ${data.cep}</p>
                            <p><strong>Logradouro:</strong> ${data.logradouro || "Não disponível"}</p>
                            <p><strong>Complemento:</strong> ${data.complemento || "Não disponível"}</p>
                            <p><strong>Bairro:</strong> ${data.bairro || "Não disponível"}</p>
                            <p><strong>Cidade:</strong> ${data.localidade || "Não disponível"}</p>
                            <p><strong>Estado:</strong> ${data.uf || "Não disponível"}</p>
                        `;
                        result.style.color = "green";
                    }
                });
            } else {
                result.innerHTML = "Erro ao buscar CEP!";
                result.style.color = "red";
            }
        });
    }
});
