import React, {FC, memo, useState} from 'react';
import styles from "./styles.module.scss";
import Deputy from "@models/Deputy";
import DeputyModal from "@components/proposition/details/deputy/modal";

interface Props {
    className?: string;
    deputy: Deputy
    noMarginTop?: boolean;
    removeTrace?: boolean;
}

export const DeputyCard: FC<Props> = memo(function DeputyCard({
      deputy,
      noMarginTop = false,
      removeTrace = false,
      ...props
}) {
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className={styles.deputyNameContainer} style={{marginTop: noMarginTop ? '0' : '16px'}}>
            <div className={styles.deputyNameLabel} onClick={openModal}>
              {removeTrace ? '' : '-'} {deputy.electoralName}
            </div>
            {modalOpen && <DeputyModal deputy={deputy} closeModal={closeModal}/>}
        </div>
    );
});

export default DeputyCard;
