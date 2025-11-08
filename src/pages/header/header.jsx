import { UseAuth } from '../../context/context';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import irAteContato from '../../util/scroll';
import EmBreve from '../../util/emBreve';
import './header.scss';

function Header() {
    const { usuario } = UseAuth();
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);


    const reload = () => {
        window.location.reload();
    }


    return (
        <div className={`header ${visible ? 'visible' : 'hidden'}`}>
            <div className="title-header">
                <h1 onClick={reload} className='logo'>.OluisDev</h1>
            </div>
            <nav className="links">
                {usuario ? (
                    <nav className='logado'>
                        <span>Olá, {usuario.nome}</span>

                        <Link to="/">Home</Link>
                        <Link to="/perfil">Perfil</Link>
                        <a href="#" onClick={EmBreve}>Serviços</a>
                        <a href="#contato" onClick={irAteContato}>Contato</a>
                    </nav>
                ) : (
                    <nav className="visita">
                        <span>Olá, visitante</span>
                        <Link to="/login">Entrar</Link>
                        <a href="#" onClick={EmBreve}>Serviços</a>
                        <a href="#contato" onClick={irAteContato}>Contato</a>
                    </nav>
                )}
            </nav>
        </div>
    )
}

export default Header;