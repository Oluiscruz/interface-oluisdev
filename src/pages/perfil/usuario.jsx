import './usuario.scss';
import { UseAuth } from '../../context/context';
import { useNavigate, Link } from 'react-router-dom';

function Usuario() {
    const navigate = useNavigate();

    const { usuario, logout } = UseAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    const retornar = () => {
        navigate('/');
    }

    const saudacao =
        usuario ? (usuario.genero === 'mas' ? 'Bem vindo'
        : usuario.genero === 'fem' ? 'Bem vinda' 
        : 'Bem vindo(a)')
        : 'Bem vindo(a)';

    return (
        <div className="container-usuario">
            {usuario ? (
                <div className='box'>
                    <h1 className='welcome'>{saudacao}, {usuario.nome}</h1>
                    <p>Informações da conta:</p>
                    <p>{usuario.email}</p>
                    <div className="btns">
                        <button onClick={handleLogout} btn-back>Sair</button>
                        <button onClick={retornar} btn-back>Voltar a tela de início</button>
                    </div>
                </div>
            ) : (
                <div>
                <Link to='/login'>Fazer login</Link> | <Link to='/cadastro'>Criar conta</Link>
                </div>
            )}
        </div>
    )
}

export default Usuario;