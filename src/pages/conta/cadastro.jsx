import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UseAuth } from "../../context/context";
import './conta.scss';


function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [genero, setGenero] = useState("");
    const [mensagem, setMensagem] = useState("");

    const navigate = useNavigate();
    const { login } = UseAuth();

    const handleBackHome = (e) => {
        e.preventDefault();
        navigate("/");
    }

    const handleCadastro = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(import.meta.env.VITE_API_URL, {
                nome: nome,
                email: email,
                senha: senha,
                genero: genero,
            });

            login(response.data.user);
            navigate("/"); // Redireciona para a página inicial após o cadastro bem-sucedido

        }

        catch (error) {
            if (error.response) {
                setMensagem(error.response.data.message);
            } else {
                setMensagem("Erro ao cadastrar usuário. Tente novamente...");
            }
        };
    };

    return (
        <div className="container-conta">

            <div className="conta">
                <h2>CRIE SUA CONTA</h2>
                <form onSubmit={handleCadastro} className="cadastro-Form">
                    <div className="inputs">
                        <label><span className='asterixo'>*</span>Nome</label>
                        <input type="text"
                            placeholder="Informe um nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)} required />
                    </div>

                    <div className="inputs">
                        <label><span className='asterixo'>*</span>Email</label>
                        <input type="email"
                            placeholder="Insira um email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </div>

                    <div className="inputs">
                        <label><span className='asterixo'>*</span>Senha</label>
                        <input type="password"
                            placeholder="Insira uma senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required />
                    </div>
                    <div className="inputs">
                        <label>Gênero</label>
                        <select name="Gênero"
                            value={genero}
                            onChange={(e) => setGenero(e.target.value)}
                            required>
                                <option value="">Selecionar</option>
                                <option value="mas">Masculino</option>
                                <option value="fem">Feminino</option>
                                <option value="other">Outro</option>
                                </select>
                    </div>
                    <button type="submit">CADASTRAR</button>
                </form>

                <p>
                    <Link to='/login'>Já possui uma conta? <b>Entre agora!</b></Link>
                </p>
                <p>
                    {mensagem && <p className="mensagem">{mensagem}</p>}
                    <button className="back-home" onClick={handleBackHome}>Voltar ao início</button>
                </p>
            </div>
        </div>
    );
}
export default Cadastro;