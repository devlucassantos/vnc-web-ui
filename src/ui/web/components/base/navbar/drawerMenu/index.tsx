import { memo } from 'react';
import type { FC } from 'react';

import styles from './styles.module.scss';
import {Drawer} from "@mui/material";
import {Link} from "react-router-dom";

interface Props {
  className?: string;
  isOpen: boolean,
  onClose: any
}

export const DrawerMenu: FC<Props> = memo(function DrawerMenu({
    isOpen,
    onClose ,
    ...props
}) {
  return (
      <Drawer anchor="left" open={isOpen} onClose={onClose}>
          <div className={styles.drawerContent}>
              <div className={styles.line}></div>
              <Link to="/" >
                  <div className={styles.homeItem}>
                      <div className={styles.homeIcon}></div>
                      <div className={styles.home}>Home</div>
                  </div>
              </Link>
              <Link to="/proposicoes" >
                  <div className={styles.propositionItem}>
                      <div className={styles.lawDocumentIcon}></div>
                      <div className={styles.proposition}>Proposições</div>
                  </div>
              </Link>
              <Link to="/boletins" >
                  <div className={styles.newsletterItem}>
                      <div className={styles.newsIcon}></div>
                      <div className={styles.newsletter}>Boletins</div>
                  </div>
              </Link>
              <Link to="/trendings" >
                  <div className={styles.trendingsItem}>
                      <div className={styles.trendingsIcon}></div>
                      <div className={styles.trendings}>Trendings</div>
                  </div>
              </Link>
              <div className={styles.imageFrame}>
                <div className={styles.vncLogo}></div>
              </div>
              <div className={styles.closeButton} onClick={onClose}></div>
          </div>
      </Drawer>
  );
});
