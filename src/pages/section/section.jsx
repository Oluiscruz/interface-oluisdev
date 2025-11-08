import { UseAuth } from '../../context/context';
import { Link } from 'react-router-dom';
import irAteContato from '../../util/scroll';
import './section.scss';

function Section() {
    const { usuario, logout } = UseAuth();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        window.location.reload();
    };

    const saudacao = usuario ? (
        usuario.genero === 'mas' ? 'Bem vindo'
            : usuario.genero === 'fem' ? 'Bem vinda'
                : 'Bem vindo(a)'
    ) : 'Bem vindo(a)';

    return (
        <section className="banner">
            {usuario ? (
                <div className='box-section'>
                    <div className="legend-banner">
                        <h1 className='welcome'>
                            {saudacao}, {usuario.nome}!
                        </h1>
                        <p>Seu email: {usuario.email}</p>
                    </div>
                    <button onClick={handleLogout} className='btn-logout'>Sair</button>
                </div>
            ) : (
                <div className='box-section'>
                    <div className="legend-banner">
                        <h1 className='welcome'>Sites e Portais<br></br>Corporativos & Pessoais</h1>
                        <p><b>Desenvolva seu</b> site, aplicativo e muito mais com Oluisdev</p>
                    </div>
                    <button className='ver-mais' onClick={irAteContato}>Entre em contato</button>
                    <p className='section-do-login'>
                        <Link to='/login' >Faça login</Link> ou <Link to='/cadastro'>Crie sua conta</Link>
                    </p>
                </div>
            )}
        </section>
    )
}

export default Section;