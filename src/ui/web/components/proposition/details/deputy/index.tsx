import React from 'react';
import Deputy from "@models/Deputy";
import styles from "./styles.module.scss";

class DeputyModal extends React.Component<{ deputy: Deputy, closeModal: any }> {
    render() {
        let {deputy, closeModal} = this.props;
        return (
            <div className={`${styles.modal} ${deputy ? styles.show : ''}`}  onMouseLeave={closeModal}>
                <div className={styles.modalContent} onMouseEnter={(e) => e.stopPropagation()}>
                    <div className={styles.deputyInfo}>
                        <div className={styles.profileImageContainer}>
                            <img className={styles.profileImage} src={deputy.imageUrl} alt={deputy.name} />
                        </div>
                        <div>
                            <h2>{deputy.electoralName}</h2>
                            <p>{deputy.name}</p>
                        </div>
                    </div>

                    <div className={styles.partyInfo}>
                        <div className={styles.party}>
                            <img className={styles.partyImage} src={deputy.party.imageUrl} alt={deputy.party.name}/>
                            <p>Partido Atual</p>
                            <h3>{deputy.party.name}</h3>
                            <p>{deputy.party.acronym}</p>
                        </div>

                        <div className={styles.party}>
                            <img
                                className={styles.partyImage}
                                src={deputy.partyInTheProposal.imageUrl}
                                alt={deputy.partyInTheProposal.name}
                            />
                            <p>Partido Na Proposição</p>
                            <h3>{deputy.partyInTheProposal.name}</h3>
                            <p>{deputy.partyInTheProposal.acronym}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeputyModal;
