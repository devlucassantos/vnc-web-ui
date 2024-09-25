import React, {FC, memo, useState} from "react";
import styles from "./styles.module.scss";
import {DrawerMenu} from "./drawerMenu";
import {Link} from "react-router-dom";
import {MenuIcon} from "../icon/MenuIcon";
import {FaEllipsisV, FaSearch, FaUser, FaExclamationCircle} from "react-icons/fa";
import TextField from "@mui/material/TextField";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    IconButton,
    Box,
    InputAdornment,
    Typography, Alert
} from '@mui/material';
import Party from "@models/Party";
import Deputy from "@models/Deputy";
import ExternalAuthor from "@models/ExternalAuthor";
import FiltersModal from "@components/base/filters/modal";
import ArticleType from "@models/ArticleType";
import User from "@models/User";
import DIContainer from "@web/dicontainer";
import LogoutIcon from '@mui/icons-material/Logout';

interface Props {
    className?: string;
    showFilter?: boolean;
    startDate?: Date | null;
    endDate?: Date | null;
    articleType?: ArticleType | null;
    party?: Party | null;
    deputy?: Deputy | null;
    externalAuthor?: ExternalAuthor | null;
    onContentChange?: (value: string) => void;
    onStartDateChange?: (value: Date | null) => void;
    onEndDateChange?: (value: Date | null) => void;
    onArticleTypeChange?: (value: ArticleType | null) => void;
    onPartyChange?: (value: Party | null) => void;
    onDeputyChange?: (value: Deputy | null) => void;
    onExternalAuthorChange?: (value: ExternalAuthor | null) => void;
    onFilterClick?: () => void;
}

const authenticationService = DIContainer.getAuthenticationUseCase();

export const Navbar: FC<Props> = memo(function Navbar({
    showFilter = true,
    startDate,
    endDate,
    party,
    articleType,
    deputy,
    externalAuthor,
    onContentChange,
    onStartDateChange,
    onEndDateChange,
    onPartyChange,
    onArticleTypeChange,
    onDeputyChange,
    onExternalAuthorChange,
    onFilterClick
}) {
    const [user, setUser] = useState<User | null>(
        authenticationService.getCachedUser() as User
    );
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [error, setError] = useState('');
    const handleFilterModalOpen = () => setIsFilterModalOpen(true);
    const handleFilterModalClose = () => setIsFilterModalOpen(false);
    const handleDrawerOpen = () => {setIsDrawerOpen(true)};
    const handleDrawerClose = () => {setIsDrawerOpen(false)};
    const handleLogoutModalOpen = () => {setIsLogoutModalOpen(true)};
    const handleLogoutModalClose = () => {setIsLogoutModalOpen(false)};
    const handleLogout = async () => {
        try {
            await authenticationService.signOut()
            setError('');
            window.location.href = '/';
        } catch (error) {
            setError('Um erro inesperado ocorreu ao tentar deslogar. Por favor, tente novamente.');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            if (onFilterClick) {
                onFilterClick();
            }
        }
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.iconMenu} onClick={handleDrawerOpen} >
                <MenuIcon className={styles.icon} />
            </div>
            <Link to="/">
                <div className={styles.logoWhite} />
            </Link>

            <div className={styles.rightSection}>
                { user ? (
                    <div onClick={handleLogoutModalOpen} className={styles.authContainer}>
                        <span className={styles.logoutSpan}>Sair</span>
                        <IconButton  sx={{
                            padding: 0,
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                            '&:focus': {
                                outline: 'none',
                            },
                        }}>
                            <LogoutIcon sx={{ color: 'white', fontSize: '24px' }} />
                        </IconButton>
                    </div>
                ) : (
                    <Link className={styles.authContainer} to="/login">
                        <span className={styles.loginSpan}>Entrar</span>
                        <FaUser className={styles.loginIcon} />
                    </Link>
                )}

                {showFilter &&
                    <>
                        <div className={styles.divider}></div>

                        <TextField
                            className={styles.searchInput}
                            variant="outlined"
                            placeholder="Pesquisar"
                            onKeyPress={handleKeyPress}
                            onChange={(e) => {
                                if (onContentChange) {
                                    onContentChange(e.target.value);
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FaSearch
                                            style={{ color: "#0047AB", cursor: "pointer" }}
                                            onClick={onFilterClick}
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end" sx={{ paddingRight: "8px" }}>
                                        <FaEllipsisV
                                            style={{ color: "#0047AB", fontSize: "20px", cursor: "pointer" }}
                                            onClick={handleFilterModalOpen}
                                        />
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: "30px",
                                },
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    paddingRight: 0,
                                    borderRadius: "30px",
                                    backgroundColor: "white",
                                    height: "36px",
                                    color: "#0047AB"
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                },
                                "& .MuiInputBase-input::placeholder": {
                                    color: "#0047AB",
                                    opacity: 1,
                                },
                            }}
                        />

                        {
                            isFilterModalOpen &&
                            <FiltersModal
                                closeModal={handleFilterModalClose}
                                startDate={startDate || null}
                                endDate={endDate || null}
                                articleType={articleType}
                                party={party}
                                deputy={deputy}
                                externalAuthor={externalAuthor}
                                onFilterClick={onFilterClick || (() => {})}
                                onStartDateChange={onStartDateChange || (() => {})}
                                onEndDateChange={onEndDateChange || (() => {})}
                                onArticleTypeChange={onArticleTypeChange}
                                onPartyChange={onPartyChange}
                                onDeputyChange={onDeputyChange}
                                onExternalAuthorChange={onExternalAuthorChange}
                            />
                        }
                    </>
                }
                <Dialog
                    open={isLogoutModalOpen}
                    onClose={handleLogoutModalClose}
                    maxWidth="xs"
                    fullWidth
                    PaperProps={{
                        style: { padding: '24px' }
                    }}
                >
                    {error && (
                        <Box sx={{ width: '100%' }}>
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {error}
                            </Alert>
                        </Box>
                    )}
                    <DialogTitle>
                        <div style={{ textAlign: 'center' }}>
                            <FaExclamationCircle size={100} color="#0047ab" />
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="h6" align="center" gutterBottom>
                            Tem certeza de que deseja sair?
                        </Typography>
                    </DialogContent>
                    <DialogActions style={{ justifyContent: 'center' }}>
                        <Button onClick={handleLogoutModalClose} color="primary" sx={{ textTransform: 'none' }}>
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleLogout}
                            sx={{
                                backgroundColor: '#0047ab',
                                color: 'white',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#003580',
                                },
                            }}
                        >
                            Confirmar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <DrawerMenu isOpen={isDrawerOpen} onClose={handleDrawerClose} />
        </div>
    );
});

export default Navbar;
