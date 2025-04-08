import React, {FC, memo, useEffect, useRef, useState} from "react";
import BigCard from "@components/news/cards/bigCard";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Article from "@models/Article";
import styled from 'styled-components';
import SplitCard from "@components/news/cards/splitCard";
import LargeEventCard from "@components/event/largeCard";

interface Props {
  className?: string;
  articleList: Article[];
  typePropositionLabel?: string;
  carouselStyle?: any;
  cardStyle?: any;
  imageContainerStyle?: any;
  titleStyle?: any;
  dotColor?: string;
  isSplitCard?: boolean;
  isEvent?: boolean;
  displayArticleTypeLabel?: boolean;
}

const StyledCarousel = styled(Carousel)<{ dotColor: string, isSplitCard: boolean }>`
    .react-multi-carousel-dot button {
        background-color: ${props => props.isSplitCard ? 'rgba(255, 255, 255, 0.5)' : 'white'};
        border: none;
    }

    .react-multi-carousel-dot--active button {
        background-color: ${props => props.isSplitCard ? 'white' : props.dotColor};
    }

    .react-multiple-carousel__arrow {
        z-index: 1;
    }
`;

export const CustomCarousel: FC<Props> = memo(function CustomCarousel({
    articleList,
    typePropositionLabel,
    carouselStyle,
    cardStyle,
    imageContainerStyle,
    titleStyle,
    dotColor = "#0047AB",
    isSplitCard = false,
    isEvent = false,
    displayArticleTypeLabel = true,
    ...props
}) {
  const [hiddenStates, setHiddenStates] = useState<Record<string, boolean>>({});
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    const updateHiddenStates = () => {
      setTimeout(() => {
        const slides = document.querySelectorAll('.react-multi-carousel-item [data-id]');
        const newHiddenStates = articleList.reduce<Record<string, boolean>>((acc, article) => {
          const slide = Array.from(slides).find(
            (slide) => slide.getAttribute('data-id') === article.id
          );
          const ariaHidden = slide?.closest('.react-multi-carousel-item')?.getAttribute('aria-hidden');
          acc[article.id] = ariaHidden === 'true';
          return acc;
        }, {});

        setHiddenStates(newHiddenStates);
      }, 0);
    };

    updateHiddenStates();

    const carouselContainer = document.querySelector('.react-multi-carousel-list');
    if (!carouselContainer) return;

    if (!observerRef.current) {
      observerRef.current = new MutationObserver(updateHiddenStates);
      observerRef.current.observe(carouselContainer, {attributes: true, subtree: true});
    }

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [articleList]);

  return (
    <StyledCarousel
      dotColor={dotColor}
      isSplitCard={isSplitCard}
      className={`${carouselStyle}`}
      additionalTransfrom={0}
      arrows={true}
      autoPlaySpeed={3000}
      centerMode={false}
      containerClass="container"
      draggable
      focusOnSelect={false}
      infinite={false}
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024
          },
          items: 1
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0
          },
          items: 1
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464
          },
          items: 1
        }
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots
      slidesToSlide={1}
      swipeable
    >
      {articleList?.map((article, index) => {
        const isHidden = hiddenStates[article.id] ?? false;

        return isEvent ? <LargeEventCard key={index} article={article} isHidden={isHidden}/> :
          isSplitCard ? <SplitCard key={index} article={article} isHidden={isHidden}/> :
            <BigCard key={index} article={article} isHidden={isHidden} typePropositionLabel={typePropositionLabel!}
                     cardStyle={cardStyle}
                     imageContainerStyle={imageContainerStyle} titleStyle={titleStyle}
                     displayArticleTypeLabel={displayArticleTypeLabel}/>;
      })}
    </StyledCarousel>
  );
});

export default CustomCarousel;
