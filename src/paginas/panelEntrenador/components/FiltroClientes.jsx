import '../styles/FiltroClientes.css';

export default function FiltroClientes({ search, setSearch, nivel, setNivel }) {

    return (
        <div className="filtros-inline">
    <input
        type="text"
        placeholder="Buscar cliente..."
        value={search}
        onChange={e => setSearch(e.target.value)}
    />
        </div>
    );
}
