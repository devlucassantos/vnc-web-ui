import React, {FC, memo, useState} from 'react';
import {
    Button,
    TextField,
    Box,
    Typography,
    Container,
    Grid,
    Link,
    Alert,
    IconButton,
    InputAdornment,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/system';
import DIContainer from "@web/dicontainer";
import { useNavigate } from 'react-router-dom';

interface Props {
    className?: string;
}

const Logo = styled('div')({
    backgroundColor: '#0047AB',
    color: 'white',
    textAlign: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 900px)': {
        minHeight: '50vh',
    },
});

const LoginContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    '@media (max-width: 900px)': {
        minHeight: '50vh',
    },
});

const LoginBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
});

const LogoImage = styled('img')({
    width: '100%',
    maxWidth: '750px',
    maxHeight: '75%',
    height: 'auto',
    objectFit: 'contain',
    '@media (max-width: 900px)': {
        maxWidth: '60%',
    },
});

const SubmitButton = styled(Button)({
    backgroundColor: '#0047AB',
    color: 'white',
    '&:hover': {
        backgroundColor: '#002080',
    },
    marginTop: '20px',
});

const authenticationService = DIContainer.getAuthenticationUseCase();

export const LoginPage: FC<Props> = memo(function LoginPage(props = {}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [persistAfterSession, setPersistAfterSession] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const user = await authenticationService.signIn(email, password, persistAfterSession)
            authenticationService.configureAuthorization();
            setError('');
            navigate('/');
        } catch (error) {
            setError('E-mail ou senha incorretos!');
        }
    };

    return (
        <Grid container>
            <Grid item xs={12} md={6}>
                <Logo>
                    <LogoImage
                        src="/src/ui/web/assets/vnc-circular-logo.png"
                        alt="Logo da Plataforma Você na Câmara"
                    />
                </Logo>
            </Grid>

            <Grid item xs={12} md={6}>
                <LoginContainer maxWidth="xs">
                    <LoginBox>
                        <Typography variant="h5" component="h2">
                            Login
                        </Typography>
                        {error && (
                            <Box sx={{ width: '100%' }}>
                                <Alert severity="error" sx={{ mt: 2 }}>
                                    {error}
                                </Alert>
                            </Box>
                        )}
                        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                            >
                                                {showPassword ? <VisibilityOff aria-hidden="true" /> : <Visibility aria-hidden="true" />}
                                            </IconButton>
                                    </InputAdornment>
                                    ),
                                }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={persistAfterSession}
                                        onChange={(e) => setPersistAfterSession(e.target.checked)}
                                        sx={{
                                            color: '#0047AB',
                                            '&.Mui-checked': { color: '#0047AB' },
                                            borderRadius: '50%',
                                        }}
                                    />
                                }
                                label="Mantenha-me conectado"
                                sx={{
                                    alignSelf: 'flex-start',
                                    mt: 1,
                                    color: '#727272',
                                    '& .MuiFormControlLabel-label': {
                                        fontSize: '14px',
                                    },
                                }}
                            />
                            <SubmitButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ textTransform: 'none' }}
                            >
                                Entrar
                            </SubmitButton>
                            <Grid container justifyContent="flex-start" sx={{ mt: 2 }}>
                                <Grid item>
                                    <Typography component="span" variant="body2" sx={{ color: '#727272' }}>
                                        Não tem uma conta?
                                    </Typography>
                                    <Box component="span" sx={{ mx: 0.3 }} />
                                    <Link href="/sign-up" sx={{ color: '#0047AB', textDecoration: 'none' }} aria-label="Ir para a página cadastro da conta">
                                        <Typography component="span" variant="body2">
                                            Cadastre-se
                                        </Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </LoginBox>
                </LoginContainer>
            </Grid>
        </Grid>
    );
});
