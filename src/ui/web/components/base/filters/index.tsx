import {FC, memo} from "react";
import styles from './styles.module.scss';

interface Props {
    className?: string;
    filtersRowStyle: any
}

export const Filters: FC<Props> = memo(function Navbar({
    filtersRowStyle,
    ...props
}) {
    const partyOptions = ['PT', 'PSDB', 'MDB', 'PSL', 'DEM'];
    const deputyOptions = ['João Silva', 'Maria Oliveira', 'Carlos Souza', 'Ana Santos'];

    return (
        <div className={filtersRowStyle}>
            <input type="text" placeholder="Conteúdo" className={styles.filterInput} />
            <input type="date" placeholder="Data Inicial" className={styles.filterInput} />
            <input type="date" placeholder="Data Final" className={styles.filterInput} />
            <select className={styles.filterSelect} defaultValue="" placeholder="Partido">
                <option value="" disabled hidden>
                    Selecione um partido
                </option>
                {partyOptions.map((party, index) => (
                    <option key={index} value={party}>
                        {party}
                    </option>
                ))}
            </select>
            <select className={styles.filterSelect} defaultValue="" placeholder="Deputado">
                <option value="" disabled hidden>
                    Selecione um deputado
                </option>
                {deputyOptions.map((deputy, index) => (
                    <option key={index} value={deputy}>
                        {deputy}
                    </option>
                ))}
            </select>
            <button className={styles.filterButtonBlue}>Filtrar</button>
            <button className={styles.filterButtonClear}>Limpar</button>
        </div>
    );
});
