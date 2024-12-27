import React, {FC, memo} from "react";
import styles from "./styles.module.scss";

interface Props {
    className?: string;
}

export const LongHorizontalRectangularAnnouncement: FC<Props> = memo(function LongHorizontalRectangularAnnouncement(props = {}) {
    return (
        <div className={styles.longHorizontalRectangularAdContainer}>
            <img className={styles.imageAd} src="/src/ui/web/assets/vnc-long-horizontal-rectangular-ad.jpeg" alt={'Imagem de anúncio horizontal da plataforma Você na Câmara'} />
        </div>
    );
});

export default LongHorizontalRectangularAnnouncement;
