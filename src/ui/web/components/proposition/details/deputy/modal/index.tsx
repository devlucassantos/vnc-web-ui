import React from 'react';
import Deputy from "@models/Deputy";
import styles from "./styles.module.scss";
import {FaTimes} from "react-icons/fa";

class DeputyModal extends React.Component<{ deputy: Deputy, closeModal: any }> {
    render() {
        let {deputy, closeModal} = this.props;
        return (
            <>
                <div className={`${styles.modal} ${deputy ? styles.show : ''}`}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.closeButtonDiv} onClick={closeModal}>

                            <FaTimes className={styles.closeButton} aria-label="Ícone de fechamento do modal." />
                        </div>
                        <div className={styles.detailsContainer}>
                            <div className={styles.infoContainer}>
                                <div className={styles.infoColumn}>
                                    <h3 className={styles.infoLabel}>Dados do deputado</h3>
                                    <label className={styles.label}>Nome eleitoral</label>
                                    <label className={styles.nameLabel}>{deputy.electoralName}</label>
                                    <label className={styles.label}>Nome completo</label>
                                    <label className={styles.nameLabel}>{deputy.name}</label>
                                    <label className={styles.label}>Unidade da federação</label>
                                    <label className={styles.nameLabel}>{deputy.federatedUnit}</label>
                                    {deputy.previousFederatedUnit && deputy.federatedUnit !== deputy.previousFederatedUnit && (
                                      <>
                                          <label className={styles.label}>Unidade da federação na proposição</label>
                                          <label className={styles.nameLabel}>{deputy.federatedUnit}</label>
                                      </>
                                    )}
                                </div>
                                <div className={styles.imageContainer}>
                                <img className={styles.profileImage} src={deputy.imageUrl} alt={deputy.imageDescription ?? `Imagem do deputado ${deputy.name}`} />
                                </div>
                            </div>
                            <div className={styles.infoContainer}>
                                <div className={styles.infoColumn}>
                                    <h3 className={styles.infoLabel}>Dados do partido atual</h3>
                                    <label className={styles.label}>Nome do partido</label>
                                    <label className={styles.nameLabel}>{deputy.party.name}</label>
                                    <label className={styles.label}>Sigla</label>
                                    <label className={styles.nameLabel}>{deputy.party.acronym}</label>
                                </div>
                                <div className={styles.imageContainer}>
                                    <img className={styles.partyImage} src={deputy.party.imageUrl} alt={`Imagem do partido ${deputy.party.imageUrl} do deputado.`}  />
                                </div>
                            </div>
                            {deputy.previousParty && deputy.party.id != deputy.previousParty.id &&
                                <div className={styles.infoContainer}>
                                    <div className={styles.infoColumn}>
                                        <h3 className={styles.infoLabel}>Dados do partido na proposição</h3>
                                        <label className={styles.label}>Nome do partido</label>
                                        <label className={styles.nameLabel}>{deputy.previousParty.name}</label>
                                        <label className={styles.label}>Sigla</label>
                                        <label className={styles.nameLabel}>{deputy.previousParty.acronym}</label>
                                    </div>
                                    <div className={styles.imageContainer}>
                                        <img className={styles.partyImage} src={deputy.previousParty.imageUrl} alt={`Imagem do partido ${deputy.previousParty.name} do deputado na proposição.`} />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {deputy && <div className={styles.modalOverlay} onClick={closeModal} />}
            </>
        );
    }
}

export default DeputyModal;
