import React, {FC, memo} from "react";
import styles from "./styles.module.scss";
import AdsComponent from "@components/base/adsComponent";

interface Props {
    className?: string;
}

export const LongVerticalRectangularAnnouncement: FC<Props> = memo(function LongVerticalRectangularAnnouncement(props = {}) {
    return (
        <div className={styles.container}>
          <div className={styles.image}>
            {/*<img className={styles.image} src="/src/ui/web/assets/long-vertical-rectangular-ad.png"*/}
            {/*     alt={'Imagem de anúncio vertical da plataforma Você na Câmara'}/>*/}
            <AdsComponent dataAdSlot="4554675950"/>
          </div>
        </div>
    );
});

export default LongVerticalRectangularAnnouncement;
