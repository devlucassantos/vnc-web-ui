import React, { useState, useEffect } from 'react';
import {Rating, Dialog, DialogTitle, DialogContent, Button, Typography} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import styled from 'styled-components';
import User from "@models/User";
import DIContainer from "@web/dicontainer";

interface StarRatingProps {
    onSubmitRating: (rating: number) => Promise<void>;
    initialRating?: number;
}

const RatingContainer = styled.div`
    display: flex;
    justify-content: end;
    margin-top: 0.4rem;
`;

const CustomStarIcon = styled(StarIcon)`
    color: #0047AB;
    stroke: #0047AB;
    stroke-width: 1.5;
`;

const EmptyStarIcon = styled(StarIcon)`
    color: #fff;
    stroke: #0047AB;
    stroke-width: 1.5;
`;

const DialogContentStyled = styled(DialogContent)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
`;

const DialogTitleStyled = styled(DialogTitle)`
    margin-top: 10px;
    font-weight: bold;
    font-size: 24px;
    font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif;
`;

const CustomLargeStarIcon = styled(StarIcon)`
    color: #0047AB;
    font-size: 150px;
`;

const SubTitle = styled.p`
    margin-top: 0;
    color: #888;
    font-size: 18px;
    font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif;
`;

const NotAuthenticatedDialogTitleStyled = styled(DialogTitle)`
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 18px;
    font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif;
    color: black;
`;


const authenticationService = DIContainer.getAuthenticationUseCase();

const StarRating: React.FC<StarRatingProps> = ({ onSubmitRating, initialRating = 0 }) => {
    const [rating, setRating] = useState<number | null>(initialRating);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [authDialogOpen, setAuthDialogOpen] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(
        authenticationService.getCachedUser() as User
    );

    const handleRatingChange = async (event: React.SyntheticEvent, value: number | null) => {
        if (!user) {
            setAuthDialogOpen(true);
            return;
        }

        if (value !== null && !isSubmitting) {
            setIsSubmitting(true);
            setRating(value);
            try {
                await onSubmitRating(value);
                setDialogOpen(true);
                setTimeout(() => {
                    setDialogOpen(false);
                }, 1500);
            } catch (error) {
                console.error('Error submitting rating', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    useEffect(() => {
        setRating(initialRating);
    }, [initialRating]);

    const handleAuthDialogClose = () => {
        setAuthDialogOpen(false);
    };

    return (
        <RatingContainer>
            <Rating
                name="proposition-rating"
                value={rating}
                onChange={handleRatingChange}
                precision={1}
                icon={<CustomStarIcon />}
                emptyIcon={<EmptyStarIcon />}
                disabled={isSubmitting}
            />
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogContentStyled>
                    <CustomLargeStarIcon />
                    <DialogTitleStyled>Avaliação Submetida</DialogTitleStyled>
                    <SubTitle>Obrigado pelo seu feedback.</SubTitle>
                </DialogContentStyled>
            </Dialog>
            <Dialog
                open={authDialogOpen}
                onClose={() => setAuthDialogOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogContentStyled>
                    <CustomLargeStarIcon />
                    <NotAuthenticatedDialogTitleStyled>
                        Não foi possível avaliar esta matéria. Por favor, autentique-se para poder realizar a avaliação.
                    </NotAuthenticatedDialogTitleStyled>
                    <Button
                        onClick={handleAuthDialogClose}
                        sx={{
                            backgroundColor: '#0047ab',
                            color: 'white',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#003580',
                            },
                        }}
                    >
                        Fechar
                    </Button>
                </DialogContentStyled>
            </Dialog>
        </RatingContainer>
    );
};

export default StarRating;
