const irAteContato = (e) => {
        e.preventDefault();
        const contatoSection = document.getElementById('contato');
        if (contatoSection) {
            contatoSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

export default irAteContato;