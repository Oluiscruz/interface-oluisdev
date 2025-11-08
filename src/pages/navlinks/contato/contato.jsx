import { useState, useEffect } from 'react';
import axios from 'axios';
import './contato.scss';
import { UseAuth } from '../../../context/context';

function Contato() {
    const { usuario } = UseAuth();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [assunto, setAssunto] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [statusMensagem, setStatusMensagem] = useState('');
    const [enviando, setEnviando] = useState(false);

    useEffect(() => {
        if (usuario) {
            setNome(usuario.nome || '');
            setEmail(usuario.email || '');
            setAssunto(usuario.assunto || '');
        }
    }, [usuario]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);
        setStatusMensagem('');

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/enviar-mensagem`, {
                assunto: assunto || 'Mensagem de visitante',
                nome: nome,
                email: email,
                mensagem: mensagem
            });

            setStatusMensagem('Mensagem enviada com sucesso!');
            setMensagem('');
            // optionally clear assunto if desired
            // setAssunto('');
        } catch (error) {
            setStatusMensagem('Erro ao enviar mensagem. Tente novamente.');
            console.error('Erro:', error);
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="container-contato" id="contato">
            {usuario ? (
                <div className='caixa-contact'>
                    <div className="title-contact">
                    <h1>Solicite contato agora</h1>
                    <p>Envie-me seus dados abaixo, e, o mais imediato possível eu<br></br>entrarei em contato para atendê-lo(a)</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <span className='info-span'>(*) Campos Obrigatórios</span>
                            <label><span className='asterixo'>*</span>Nome:</label>
                            <input
                                type="text"
                                placeholder='Digite seu nome aqui'
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label><span className='asterixo'>*</span>Email:</label>
                            <input
                                type="email"
                                placeholder='Informe seu melhor email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label><span className='asterixo'>*</span>Assunto:</label>
                            <input
                                type="text"
                                placeholder='Qual o assunto?'
                                value={assunto}
                                onChange={(e) => setAssunto(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label><span className='asterixo'>*</span>Mensagem:</label>
                            <textarea
                                value={mensagem}
                                onChange={(e) => setMensagem(e.target.value)}
                                placeholder='Digite sua mensagem...'
                                required
                                rows={5}
                            />
                        </div>
                        <div className="form-group">
                            <div className="confirm">
                                <p>Os dados coletados nesse site seguem os padrões de segurança e confidencialidade exigidos por lei.
                                    O aceite do termo permite o recebimento de materiais de divulgação de Oluisdev.
                                    As informações coletadas não serão, em hipótese alguma, comercializadas a terceiros</p>
                                <div className="check">

                                    <input type="checkBox" /><b><span className='asterixo'>*</span>Li e estou de acordo com os termos descritos acima.</b>
                                </div>
                            </div>
                        </div>
                        <button type="submit" disabled={enviando}>
                            {enviando ? 'Enviando...' : 'Enviar'}
                        </button>
                        {statusMensagem && (
                            <p className={statusMensagem.includes('sucesso') ? 'success' : 'error'}>
                                {statusMensagem}
                            </p>
                        )}
                        <p>Ou se preferir: <a href="https://wa.me/5581999155751?text=Olá, vi sua aplicação e gostaria de falar sobre!">WhatsApp</a></p>
                    </form>
                </div>
            ) : (
                <div className='caixa-contact'>
                    <div className="title-contact">
                        <h1>Solicite contato agora</h1>
                        <p>Envie-me seus dados abaixo, e, o mais breve possível<br></br>entrarei em contato para atendê-lo(a)</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <span className='info-span'>(*) Campos Obrigatórios</span>
                            <label><span className='asterixo'>*</span>Nome:</label>
                            <input
                                type="text"
                                placeholder='Digite seu nome aqui'
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label><span className='asterixo'>*</span>Email:</label>
                            <input
                                type="email"
                                placeholder='Informe seu melhor email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label><span className='asterixo'>*</span>Assunto:</label>
                            <input
                                type="text"
                                placeholder='Qual o assunto?'
                                value={assunto}
                                onChange={(e) => setAssunto(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label><span className='asterixo'>*</span>Mensagem:</label>
                            <textarea
                                value={mensagem}
                                onChange={(e) => setMensagem(e.target.value)}
                                placeholder='Digite sua mensagem...'
                                required
                                rows={5}
                            />
                        </div>
                        <div className="form-group">
                            <div className="confirm">
                                <p>Os dados coletados nesse site seguem os padrões de segurança e confidencialidade exigidos por lei.
                                    O aceite do termo permite o recebimento de materiais de divulgação de Oluisdev.
                                    As informações coletadas não serão, em hipótese alguma, comercializadas a terceiros</p>
                                <div className="check">
                                    <input type="checkBox" /><b>Li e estou de acordo com os termos descritos acima.</b>

                                </div>
                            </div>
                        </div>
                        <button type="submit" disabled={enviando}>
                            {enviando ? 'Enviando...' : 'Enviar'}
                        </button>
                        {statusMensagem && (
                            <p className={statusMensagem.includes('sucesso') ? 'success' : 'error'}>
                                {statusMensagem}
                            </p>
                        )}
                        <p>Ou se preferir: <a href="https://wa.me/5581999155751?text=Olá, vi sua aplicação e gostaria de falar sobre!">WhatsApp</a></p>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Contato;