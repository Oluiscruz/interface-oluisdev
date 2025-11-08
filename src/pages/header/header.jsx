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
    const [menuOpen, setMenuOpen] = useState(false);

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
        <div className={`header ${visible ? 'visible' : 'hidden'} ${menuOpen ? 'menu-open' : ''}`}>
            <div className="title-header">
                <h1 onClick={reload} className='logo'>.OluisDev</h1>
            </div>

            <button
                className={`menu-button ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label="Abrir menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav className={`links ${menuOpen ? 'open' : ''}`}>
                {usuario ? (
                    <nav className='logado'>
                        <span>Olá, {usuario.nome}</span>

                        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                        <Link to="/perfil" onClick={() => setMenuOpen(false)}>Perfil</Link>
                        <a href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false); EmBreve(); }}>Serviços</a>
                        <a href="#contato" onClick={(e) => { e.preventDefault(); setMenuOpen(false); irAteContato(); }}>Contato</a>
                    </nav>
                ) : (
                    <nav className="visita">
                        <span>Olá, visitante</span>
                        <Link to="/login" onClick={() => setMenuOpen(false)}>Entrar</Link>
                        <a href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false); EmBreve(); }}>Serviços</a>
                        <a href="#contato" onClick={(e) => { e.preventDefault(); setMenuOpen(false); irAteContato(); }}>Contato</a>
                    </nav>
                )}
            </nav>
        </div>
    )
}

export default Header;