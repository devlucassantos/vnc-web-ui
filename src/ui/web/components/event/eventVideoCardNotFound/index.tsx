import {FC, memo} from "react";
import styles from "./styles.module.scss";
import {ErrorOutline} from '@mui/icons-material';

interface Props {
    color?: string;
    iconFontSize?: string;
    textFontSize?: string;
    className?: string;
}

export const EventVideoCardNotFound: FC<Props> = memo(function EventVideoCardNotFound({
    color,
    iconFontSize,
    textFontSize,
    ...props
}) {

    return (
        <div className={styles.videoCard} style={{backgroundColor: `${color}`}}>
            <ErrorOutline aria-label="Ícone de aviso de video do evento não disponível" style={{ color: 'white', fontSize: iconFontSize }} />
            <h2 className={styles.title} style={{ fontSize: textFontSize }}>Vídeo indisponível no momento.</h2>
            <img src="/src/ui/web/assets/white-logo-icon-without-background.svg" alt="Logo do Você na Câmara" className={styles.logo} />
        </div>
    );
});

export default EventVideoCardNotFound;
