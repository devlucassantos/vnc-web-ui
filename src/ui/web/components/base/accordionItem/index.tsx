import {useState} from "react";
import {ExpandLess, ExpandMore} from '@mui/icons-material';
import styles from "./styles.module.scss";

interface AccordionItemProps {
  title: string;
  startOpen?: boolean;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({title, startOpen = false, children}) => {
  const [isOpen, setIsOpen] = useState(startOpen);

  return (
    <div className={styles.accordionItem}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.accordionHeader}>
        {title}
        {isOpen ? (
          <ExpandLess className={styles.accordionIcon}/>
        ) : (
          <ExpandMore className={styles.accordionIcon}/>
        )}
      </button>
      {isOpen && <div className={styles.accordionContent}>{children}</div>}
      <div className={styles.accordionDivider} />
    </div>
  );
};

export default AccordionItem;
