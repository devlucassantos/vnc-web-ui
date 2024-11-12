import React, {FC, memo} from "react";
import BigCard from "@components/news/cards/bigCard";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Article from "@models/Article";
import styled from 'styled-components';
import SplitCard from "@components/news/cards/splitCard";

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
    displayArticleTypeLabel = true,
    ...props
}) {

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
            infinite
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
            {articleList?.map((article, index) => (
              isSplitCard ?
                <SplitCard key={index} article={article} /> :
                <BigCard key={index} article={article} typePropositionLabel={typePropositionLabel!} cardStyle={cardStyle}
                         imageContainerStyle={imageContainerStyle} titleStyle={titleStyle} displayArticleTypeLabel={displayArticleTypeLabel}/>
            ))}
        </StyledCarousel>
    );
});

export default CustomCarousel;
