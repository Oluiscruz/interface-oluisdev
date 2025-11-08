import { createContext, useState, useContext } from "react";

// 1. Criando o contexto:
const AppContext = createContext();

// 2. Criando o provedor do contexto (Provider):

export function AuthProvider({ children }) {
    // Inicializa o estado diretamente do localStorage para evitar
    // que a UI renderize primeiro com null e só depois atualize.
    const [usuario, setUsuario] = useState(() => {
        try {
            const usuarioGuardado = localStorage.getItem('usuario');
            return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
        } catch (err) {
            console.error('Erro ao ler usuario do localStorage:', err);
            return null;
        }
    });

    // 4. Função de login:
    const login = (dadosUsuario) => {
        localStorage.setItem('usuario', JSON.stringify(dadosUsuario)); // Salvando no localStorage
        setUsuario(dadosUsuario); // Atualizando o estado do usuário
    }

    // 5. Função de logout:
    const logout = () => {
        localStorage.removeItem('usuario'); // Removendo do localStorage
        setUsuario(null); // Limpando o estado do usuário
    };
    return (
        <AppContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AppContext.Provider>
    );
}

// 6. Hook personalizado para usar o contexto:
export function UseAuth() {
    return useContext(AppContext);
}
