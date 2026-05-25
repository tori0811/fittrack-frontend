import './PlanCard.css';


export default function PlanCard({ plan }) {
  const beneficios = JSON.parse(plan.beneficios);
  const destacado = Boolean(plan.destacado);

  return (
    <div className={`plan-card ${destacado ? "destacado" : ""}`}>
      <div className="plan-header">
        <h3>{plan.nombre}</h3>
      </div>

      <div className="plan-price">
        <span className="price">{plan.precio}€</span>
        <span className="period">/ {plan.periodo}</span>
      </div>

      <ul className="plan-beneficios">
        {beneficios.map((b, i) => (
          <li key={i}>
            <span className='tick'>✔</span>{b}
            </li>
        ))}
      </ul>

      <a href="#entrenadores" className="plan-boton">
          Elegir plan
      </a>

      {destacado && <div className="badge">Recomendado</div>}
    </div>
  );
}
