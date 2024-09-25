import React, {FC, memo, useState} from 'react';
import styles from "./styles.module.scss";
import Deputy from "@models/Deputy";
import DeputyModal from "@components/proposition/details/deputy/modal";

interface Props {
    className?: string;
    deputy: Deputy
}

export const DeputyCard: FC<Props> = memo(function DeputyCard({
      deputy,
      ...props
}) {
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className={styles.deputyNameLabel} onMouseEnter={openModal}>
            - {deputy.electoralName}
            {modalOpen && <DeputyModal deputy={deputy} closeModal={closeModal}/>}
        </div>
    );
});

export default DeputyCard;
