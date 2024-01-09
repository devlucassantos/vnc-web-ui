import {FC, memo} from "react";
import styles from "./styles.module.scss";
import {EllipseIcon} from "../../icon/EllipseIcon";

interface Props {
    className?: string;
    useSmallIndicator?: boolean;
}

export const TimeLineIndicator: FC<Props> = memo(function TimeLineIndicator({
    useSmallIndicator,
    ...props
})  {
    return (
        <div className={styles.timeLine}>
            <div className={useSmallIndicator ? styles.smallLine : styles.line}>
                <div className={styles.ellipse}>
                    <EllipseIcon className={styles.icon} />
                </div>
            </div>
        </div>
    );
});

export default TimeLineIndicator;