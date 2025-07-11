import {useState} from "react";
import {ExpandLess, ExpandMore} from '@mui/icons-material';
import styles from "./styles.module.scss";

interface AccordionItemProps {
  title: string;
  startOpen?: boolean;
  textColor?: string;
  dividerColor?: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({title, startOpen = false, textColor = '#0047ab', dividerColor = '#d1cece', children}) => {
  const [isOpen, setIsOpen] = useState(startOpen);

  return (
    <div className={styles.accordionItem}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.accordionHeader}>
        <div style={{color: textColor}}>{title}</div>
        {isOpen ? (
          <ExpandLess className={styles.accordionIcon} style={{color: textColor}} />
        ) : (
          <ExpandMore className={styles.accordionIcon} style={{color: textColor}} />
        )}
      </button>
      {isOpen && <div className={styles.accordionContent}>{children}</div>}
      <div className={styles.accordionDivider} style={{backgroundColor: dividerColor}}/>
    </div>
  );
};

export default AccordionItem;
