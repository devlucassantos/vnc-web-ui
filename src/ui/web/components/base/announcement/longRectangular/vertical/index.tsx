import React, {FC, memo} from "react";
import styles from "./styles.module.scss";

interface Props {
    className?: string;
}

export const LongVerticalRectangularAnnouncement: FC<Props> = memo(function LongVerticalRectangularAnnouncement(props = {}) {
    return (
        <div className={styles.container}>
            <img className={styles.image} src="/src/ui/web/assets/long-vertical-rectangular-ad.png" alt={'Imagem de anúncio vertical da plataforma Você na Câmara'} />
        </div>
    );
});

export default LongVerticalRectangularAnnouncement;
