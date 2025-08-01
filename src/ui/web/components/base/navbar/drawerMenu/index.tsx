import {memo, useState} from 'react';
import type { FC } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Description, TrendingUp, Close, BookmarkBorder, Event, ThumbsUpDown } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import styles from "./styles.module.scss";
import User from "@models/User";
import DIContainer from "@web/dicontainer";

interface Props {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

const DrawerContent = styled.div`
  width: 340px;
  padding: 16px;
  display: flex;
  flex-direction: column;

  @media (max-width: 400px) {
    width: 200px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 24px;
`;


const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: #aba9a9;
  margin: 8px 0;
`;

const authenticationService = DIContainer.getAuthenticationUseCase();

export const DrawerMenu: FC<Props> = memo(function DrawerMenu({
   isOpen,
   onClose,
   ...props
}) {
    const [user, setUser] = useState<User | null>(
        authenticationService.getCachedUser() as User
    );
    const isActiveUser = user && !user.roles.includes('INACTIVE_USER')

    return (
        <Drawer anchor="left" open={isOpen} onClose={onClose}>
            <DrawerContent>
                <Header>
                    <div className={styles.imageFrame}>
                        <div className={styles.vncLogo} role="img" aria-label="Logo da Você na Câmara"></div>
                    </div>
                    <IconButton onClick={onClose}>
                        <Close style={{ color: 'black', fontSize: '28px' }} />
                    </IconButton>
                </Header>

                <Line />

                <List>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} aria-label="Ir para a página inicial">
                        <ListItem button>
                            <ListItemIcon>
                                <Home aria-label="Ícone de home" style={{ color: 'black', fontSize: '32px' }} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Home"
                                primaryTypographyProps={{ style: { color: 'black', fontSize: '18px', fontWeight: 'bold' } }}
                            />
                        </ListItem>
                    </Link>

                    <Link to="/newsletters" style={{ textDecoration: 'none', color: 'inherit' }} aria-label="Ir para a página de listagem dos boletins">
                        <ListItem button>
                            <ListItemIcon>
                                <Description aria-label="Ícone de boletins" style={{ color: 'black', fontSize: '32px' }} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Boletins"
                                primaryTypographyProps={{ style: { color: 'black', fontSize: '18px', fontWeight: 'bold' } }}
                            />
                        </ListItem>
                    </Link>

                    <Link to="/events" style={{ textDecoration: 'none', color: 'inherit' }} aria-label="Ir para a página de listagem dos eventos">
                        <ListItem button>
                            <ListItemIcon>
                                <Event aria-label="Ícone de eventos" style={{ color: 'black', fontSize: '32px' }} />
                            </ListItemIcon>
                            <ListItemText
                              primary="Eventos"
                              primaryTypographyProps={{ style: { color: 'black', fontSize: '18px', fontWeight: 'bold' } }}
                            />
                        </ListItem>
                    </Link>

                    <Link to="/votes" style={{ textDecoration: 'none', color: 'inherit' }} aria-label="Ir para a página de listagem das votações">
                        <ListItem button>
                            <ListItemIcon>
                                <ThumbsUpDown aria-label="Ícone de votações" style={{ color: 'black', fontSize: '32px' }} />
                            </ListItemIcon>
                            <ListItemText
                              primary="Votações"
                              primaryTypographyProps={{ style: { color: 'black', fontSize: '18px', fontWeight: 'bold' } }}
                            />
                        </ListItem>
                    </Link>

                    <Link to="/trendings" style={{ textDecoration: 'none', color: 'inherit' }} aria-label="Ir para a página de proposições em destaque">
                        <ListItem button>
                            <ListItemIcon>
                                <TrendingUp aria-label="Ícone de proposições em destaque" style={{ color: 'black', fontSize: '32px' }} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Trendings"
                                primaryTypographyProps={{ style: { color: 'black', fontSize: '18px', fontWeight: 'bold' } }}
                            />
                        </ListItem>
                    </Link>

                    { isActiveUser && (
                        <Link to="/view-later" style={{ textDecoration: 'none', color: 'inherit' }} aria-label="Ir para a página de matérias salvas">
                            <ListItem button>
                                <ListItemIcon>
                                    <BookmarkBorder aria-label="Ícone de matérias salvas" style={{ color: 'black', fontSize: '32px' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Matérias salvas"
                                    primaryTypographyProps={{ style: { color: 'black', fontSize: '18px', fontWeight: 'bold' } }}
                                />
                            </ListItem>
                        </Link>
                    )}
                </List>
            </DrawerContent>
        </Drawer>
    );
});

export default DrawerMenu;
