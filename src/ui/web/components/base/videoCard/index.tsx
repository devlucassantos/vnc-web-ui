import React, {FC, memo} from "react";
import styles from "./styles.module.scss";
import EventVideoCardNotFound from "@components/event/eventVideoCardNotFound";

interface Props {
    className?: string;
    url: string;
    color: string;
    isSmallCard: boolean;
}

export const VideoCard: FC<Props> = memo(function VideoCard({
    url,
    color,
    isSmallCard = false,
    ...props
}) {
    const getYouTubeId = (url: string) => {
        const match = url.match(
          /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
        );
        return match ? match[1] : null;
    };

    const videoId = getYouTubeId(url);

    if (!videoId) {
      const iconFontSize = isSmallCard ? '52px' : '64px';
      const textFontSize = isSmallCard ? '20px' : '28px';
      return <EventVideoCardNotFound color={color} iconFontSize={iconFontSize} textFontSize={textFontSize} />
    }

    return (
      <div className={styles.youtubeContainer}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
      </div>
    );
});

export default VideoCard;
