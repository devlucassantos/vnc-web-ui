import React, { useState } from 'react';
import {Button, Dialog, DialogContent, DialogTitle} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import styled from 'styled-components';
import User from "@models/User";
import DIContainer from "@web/dicontainer";
import {Link} from "react-router-dom";

interface ViewLaterButtonProps {
    onViewLaterSubmit: (viewLater: boolean) => Promise<void>;
    initialSelected?: boolean;
}

const ViewLaterContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const UnselectedIcon = styled(BookmarkBorderIcon)`
    color: #0047AB;
    font-size: 30px;
`;

const SelectedIcon = styled(BookmarkIcon)`
    color: #0047AB;
    font-size: 30px;
`;

const DialogSelectedIcon = styled(BookmarkIcon)`
    color: #0047AB;
    font-size: 150px;
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
    font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif;
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

const StyledLink = styled(Link)`
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: #0047ab;
`;

const authenticationService = DIContainer.getAuthenticationUseCase();

const ViewLaterButton: React.FC<ViewLaterButtonProps> = ({ onViewLaterSubmit, initialSelected = false }) => {
    const [isSelected, setIsSelected] = useState<boolean>(initialSelected);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [authDialogOpen, setAuthDialogOpen] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(
        authenticationService.getCachedUser() as User
    );
    const isInactiveUser = user && user.roles.includes('INACTIVE_USER')

    const handleViewLaterClick = async () => {
        if (!user || isInactiveUser) {
            setAuthDialogOpen(true);
            return;
        }

        if (!isSubmitting) {
            setIsSubmitting(true);
            try {
                const newViewLaterState = !isSelected;
                await onViewLaterSubmit(newViewLaterState);
                setIsSelected(newViewLaterState);
                setDialogOpen(true);
                setTimeout(() => {
                    setDialogOpen(false);
                }, 1500);
            } catch (error) {
                console.error('Error submitting view later', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleAuthDialogClose = () => {
        setAuthDialogOpen(false);
    };

    return (
        <>
            <ViewLaterContainer onClick={handleViewLaterClick}>
                {isSelected ? <SelectedIcon /> : <UnselectedIcon />}
            </ViewLaterContainer>

            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogContentStyled>
                    <DialogSelectedIcon />
                    <DialogTitleStyled>{isSelected ? 'Matéria Salva' : 'Matéria Removida'}</DialogTitleStyled>
                    <SubTitle>{isSelected ? 'Essa matéria foi salva para visualizar depois.' : 'Essa matéria foi removida dos itens salvos.'}</SubTitle>
                </DialogContentStyled>
            </Dialog>
            <Dialog
                open={authDialogOpen}
                onClose={() => setAuthDialogOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogContentStyled>
                    <DialogSelectedIcon />
                    <NotAuthenticatedDialogTitleStyled>
                        Não foi possível salvar esta matéria. Por favor,{" "}
                        {!user ? (
                            <StyledLink to='/login'>autentique-se</StyledLink>
                        ) : (
                            'autentique-se'
                        )}
                        {" e "}
                        {isInactiveUser ? (
                            <StyledLink to='/ativar-conta'>ative a sua conta</StyledLink>
                        ) : (
                            'ative a sua conta'
                        )}
                        {" para poder realizar esta ação."}
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
        </>
    );
};

export default ViewLaterButton;
