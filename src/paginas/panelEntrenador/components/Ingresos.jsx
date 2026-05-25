import useIngresosEntrenador from "../hooks/useIngresosEntrenador";
import "../styles/Ingresos.css";

export default function Ingresos() {

    const { loading, data } = useIngresosEntrenador();

    if (loading) return <p>Cargando ingresos...</p>;
    if (!data) return <p>No hay datos disponibles.</p>;

    return (
        <div className="ingresos-contenedor">

            <div className="ingresos-resumen">
                <div className="ingreso-item">
                    <h3>Total generado</h3>
                    <p className="ingreso-numero">€{data.total}</p>
                </div>

                <div className="ingreso-item">
                    <h3>Este mes</h3>
                    <p className="ingreso-numero">€{data.mes_actual}</p>
                </div>

                <div className="ingreso-item">
                    <h3>Pagos registrados</h3>
                    <p className="ingreso-numero">{data.pagos.length}</p>
                </div>
            </div>

            <h4>Historial de pagos</h4>

            <div className="ingresos-tabla">
                {data.pagos.length === 0 ? (
                    <p>No hay pagos registrados.</p>
                ) : (
                    data.pagos.map(p => (
                        <div className="pago-row" key={p.id}>
                            <span>€{p.cantidad}</span>
                            <span>{p.fecha}</span>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}
