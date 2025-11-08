const API_URL = import.meta.env.VITE_API_URL;

export async function getUsuarios() {
    const res = await fetch(`${API_URL}/usuarios`);
    return await res.json();
}

fetch(`${API_URL}/cadastro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
})

fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
})