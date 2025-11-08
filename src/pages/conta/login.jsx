import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../../context/context";
import './conta.scss';


function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    const navigate = useNavigate();
    const { login } = UseAuth();

    const handleBackHome = (e) => {
        e.preventDefault();
        navigate("/");
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setMensagem("");

        try {
            const response = await axios.post(import.meta.env.VITE_API_URL, {
                email: email,
                senha: senha,
            });

            login(response.data.user);
            navigate("/"); // Redireciona para a página inicial após o login bem-sucedido
        }

        catch (error) {
            if (error.response) {
                setMensagem(error.response.data.message);

            } else {
                setMensagem("Erro ao realizar login. Tente novamente...");
            };
        }
    }

    return (
        <div className="container-conta">

            <div className="conta">
                <h2>FAÇA LOGIN</h2>
                <form onSubmit={handleLogin} className="login-Form">
                    <div className="inputs">
                        <span className="span-obs">(*) Campos Obrigatórios</span>

                        <label><span className='asterixo'>*</span>Email</label>
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Insira um email" required />
                    </div>

                    <div className="inputs">
                        <label><span className='asterixo'>*</span>Senha</label>
                        <input type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Insira uma senha"
                            required />
                    </div>
                    <button type="submit">ENTRAR</button>
                </form>
                <p>
                    <Link to='/cadastro'>Não possui conta? <b>Crie uma agora!</b></Link>
                </p>
                <p>
                    {mensagem && <p className="mensagem">{mensagem}</p>}
                    <button className="back-home" onClick={handleBackHome}>Voltar ao início</button>
                </p>
            </div>
        </div>
    );
}
export default Login;