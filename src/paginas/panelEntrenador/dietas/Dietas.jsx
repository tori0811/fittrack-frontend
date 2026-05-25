import { useState, useEffect, useMemo } from 'react';
import './Dietas.css';
import { useDietas } from './hooks/dieta.hooks';
import CreateDietaModal from './components/modal/CreateDietaModal';
import DietaCard from './components/CardDieta/DietaCard';
import { ChevronDown, X } from 'lucide-react';
import { useRef } from 'react';

const DIET_TYPES = ['Normal', 'Flexitariana', 'Vegetariana', 'Vegana', 'Paleo', 'Otro'];

function DropdownFilter({ label, options, selected, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div className="dropdown" ref={ref}>
            <button
                className={`dropdown-item ${selected.length > 0 ? 'active' : ''}`}
                onClick={() => setOpen(!open)}>
                {selected.length > 0 ? `${label} (${selected.length})` : label}
                <ChevronDown className={open ? 'rotated' : ''} />
            </button>
            {open && (
                <div className="dropdown-menu">
                    {options.map(opt => (
                        <label key={opt} className={selected.includes(opt) ? 'selected' : ''}>
                            <input
                                type="checkbox"
                                checked={selected.includes(opt)}
                                onChange={() => onChange(opt)}
                            />
                            {opt}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function Dietas() {

    const [showModal, setShowModal] = useState(false);
    const { dietas, fetchDietas } = useDietas();
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({ types: [] });

    useEffect(() => {
        document.body.style.overflow = showModal ? 'hidden' : 'visible';
        return () => { document.body.style.overflow = 'visible'; };
    }, [showModal]);

    const toggle = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: prev[key].includes(value)
                ? prev[key].filter(i => i !== value)
                : [...prev[key], value]
        }));
    };

    const dietasFiltradas = useMemo(() => {
        return dietas.filter(d => {
            const matchSearch = d.titulo?.toLowerCase().includes(search.toLowerCase());
            const matchType = filters.types.length === 0 || filters.types.includes(d.tipo);
            return matchSearch && matchType;
        });
    }, [dietas, search, filters]);

    return (
        <div className="contaniner">
            <div className="header">
                <h2>Nutrición</h2>
            </div>
            <div className="wrapper">
                <div className="border-wrapper">
                    <h3>Mis dietas</h3>
                </div>
                <div className="toolbar">
                    <div className="toolbar-filters">
                        <div className="search-wrapper">
                            <input
                                type="text"
                                placeholder="Buscar dieta..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            {search && (
                                <button className="search-clear" onClick={() => setSearch('')}>
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                        <DropdownFilter
                            label="Tipo"
                            options={DIET_TYPES}
                            selected={filters.types}
                            onChange={v => toggle('types', v)}
                        />
                    </div>
                    <div className="btn-rutine">
                        <button className="btn-rutine-item" onClick={() => setShowModal(true)}>NUEVA DIETA</button>
                    </div>
                </div>
                <div className="rutinas-grid">
                    {dietasFiltradas.length > 0 ? (
                        dietasFiltradas.map(dieta => (
                            <DietaCard key={dieta.id} dieta={dieta} />
                        ))
                    ) : (
                        <div className="rutinas-empty">
                            <p className="rutinas-empty-title">No hay dietas que coincidan</p>
                            <p className="rutinas-empty-subtitle">Prueba a cambiar los filtros o crea una nueva dieta</p>
                        </div>
                    )}
                </div>
            </div>
            <CreateDietaModal showModal={showModal} setShowModal={setShowModal} onSuccess={fetchDietas} />
        </div>
    );
}