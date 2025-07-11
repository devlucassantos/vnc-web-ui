import React, {FC, memo, useContext, useState} from "react";
import styles from "./styles.module.scss";
import {Link} from "react-router-dom";
import {ResourceContext, ResourceContextType} from "@web/providers/resourceProvider";
import ArticleType from "@models/ArticleType";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

interface Props {
  className?: string;
}

export const ArticleNavigationBar: FC<Props> = memo(function ArticleNavigationBar(props = {}) {
  const resourceContext = useContext(ResourceContext);
  const {resource} = resourceContext ?? {
    resource: null,
    fetchResources: () => {
    },
  } as ResourceContextType;

  const handleRedirectUrl = (articleType : ArticleType) => {
    if (articleType.codes === 'newsletter') {
      return '/newsletters'
    } else if (articleType.codes === 'event') {
      return '/events'
    } else if (articleType.codes === 'voting') {
      return '/votes'
    } else {
      return '/'
    }
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.articleNavigationBar}>
        <div className={styles.articleNavigationBarRow}>
          {resource?.articleTypes?.map((articleType, index) => (
            <div key={index}>
              {articleType.codes !== 'proposition' && (
                <div className={styles.articleContainer}>
                  <Link className={styles.articleLabel} style={{color: articleType.color}}
                        to={handleRedirectUrl(articleType)}
                        aria-label={`Ir para a página de listagem de ${articleType.description}`}>
                    {articleType.description}
                  </Link>
                </div>
              )}
              {articleType.codes === 'proposition' && (
                <div className={styles.accordionItem}>
                  <button onClick={() => setIsOpen(!isOpen)} className={styles.accordionHeader}
                          style={{color: articleType.color}}>
                    {articleType.description}
                    {isOpen ? (
                      <ExpandLess className={styles.accordionIcon} style={{color: articleType.color}}/>
                    ) : (
                      <ExpandMore className={styles.accordionIcon} style={{color: articleType.color}}/>
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {isOpen && (
        <div className={styles.propositionNavigationBar}>
          <div className={styles.navigationBarRow}>
            {resource?.propositionTypes?.map((propositionType, index) => (
              propositionType.description !== 'Boletins' ? (
                <Link key={index} className={styles.propositionLabel} style={{color: propositionType.color}}
                      to={`/propositions-by-type/${propositionType.id}`}
                      aria-label={`Ir para a página de listagem de ${propositionType.description}`}>
                  {propositionType.description}
                </Link>
              ) : null
            ))}
          </div>
        </div>
      )}
    </>
  );
});

export default ArticleNavigationBar;
