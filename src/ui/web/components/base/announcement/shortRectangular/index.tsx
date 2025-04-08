import React, {FC, memo} from "react";
import styles from "./styles.module.scss";
import AdsComponent from "@components/base/adsComponent";

interface Props {
    className?: string;
}

export const ShortRectangularAnnouncement: FC<Props> = memo(function ShortRectangularAnnouncement(props = {}) {
    return (
      <div className={styles.container}>
          <div className={styles.image}>
              {/*<img className={styles.image} src="/src/ui/web/assets/vnc-short-rectangular-ad.jpeg"*/}
              {/*     alt={'Imagem de anúncio da plataforma Você na Câmara'}/>*/}
              <AdsComponent dataAdSlot="2475307526"/>
          </div>
      </div>
    );
});

export default ShortRectangularAnnouncement;
