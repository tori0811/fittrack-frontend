import { useState, useRef, useEffect } from "react";
import { WORKOUT_TYPES, DIFFICULTY_LEVELS, GENDER_OPTIONS } from "../../../../constants/workoutOptions.js";
import { ChevronDown, X } from "lucide-react";

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

    const hasSelected = selected.length > 0;

    return (
        <div className="dropdown" ref={ref}>
            <button
                className={`dropdown-item ${hasSelected ? 'active' : ''}`}
                onClick={() => setOpen(!open)}>
                {hasSelected ? `${label} (${selected.length})` : label}
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

export default function Filters({ filters, setFilters, search, setSearch }) {

    const toggle = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: prev[key].includes(value)
                ? prev[key].filter(i => i !== value)
                : [...prev[key], value]
        }));
    };

    return (
        <div className="toolbar-filters">
            <div className="search-wrapper">
                <input
                    type="text"
                    placeholder="Buscar rutina..."
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
                options={WORKOUT_TYPES}
                selected={filters.types}
                onChange={v => toggle('types', v)}
            />
            <DropdownFilter
                label="Nivel"
                options={DIFFICULTY_LEVELS}
                selected={filters.levels}
                onChange={v => toggle('levels', v)}
            />
            <DropdownFilter
                label="Sexo"
                options={GENDER_OPTIONS}
                selected={filters.genders}
                onChange={v => toggle('genders', v)}
            />
        </div>
    );
}