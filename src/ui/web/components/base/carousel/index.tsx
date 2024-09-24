import React, {FC, memo} from "react";
import BigCard from "@components/news/cards/bigCard";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Article from "@models/Article";
import styled from 'styled-components';

interface Props {
    className?: string;
    articleList: Article[];
    typePropositionLabel: string;
    carouselStyle: any;
    cardStyle: any;
    imageContainerStyle: any;
    titleStyle: any;
    dotColor?: string;
}

const StyledCarousel = styled(Carousel)<{ dotColor: string }>`
    .react-multi-carousel-dot button {
        background-color: white;
        border: none;
    }

    .react-multi-carousel-dot--active button {
        background-color: ${props => props.dotColor};
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
    ...props
}) {

    return (
        <StyledCarousel
            dotColor={dotColor}
            className={`${carouselStyle}`}
            additionalTransfrom={0}
            arrows={false}
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
                <BigCard key={index} article={article} typePropositionLabel={typePropositionLabel} cardStyle={cardStyle}
                         imageContainerStyle={imageContainerStyle} titleStyle={titleStyle}/>
            ))}
        </StyledCarousel>
    );
});

export default CustomCarousel;
