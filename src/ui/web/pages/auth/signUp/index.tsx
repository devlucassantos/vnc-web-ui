import React, {FC, memo, useEffect, useRef, useState} from 'react';
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
import {isEmailValid, isPasswordValid} from "@utils/validatorUtils";
import DIContainer from "@web/dicontainer";
import {useNavigate} from "react-router-dom";

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

const SignUpContainer = styled(Container)({
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

const SignUpBox = styled(Box)({
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

export const SignUpPage: FC<Props> = memo(function SignUpPage(props = {}) {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [persistAfterSession, setPersistAfterSession] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const emailRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus();
        }
    }, []);

    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault();

        const validationError = validateFields();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const user = await authenticationService.signUp(email, firstName, lastName, password, persistAfterSession)
            authenticationService.configureAuthorization();
            setError('');
            navigate('/');
        } catch (error) {
            setError('Não foi possível realizar o cadastro no momento. Por favor, tente novamente mais tarde.');
        }
    };

    const validateFields = () => {
        if (!email || !firstName || !lastName || !password || !confirmPassword) {
            return 'Todos os campos devem ser preenchidos.';
        }

        if (!isEmailValid(email)) {
            return 'O e-mail fornecido não é válido.';
        }

        if (!isPasswordValid(password)) {
            return 'A senha deve ter entre 8 e 50 caracteres, incluindo pelo menos uma letra e um número.';
        }

        if (password !== confirmPassword) {
            return 'As senhas inseridas não correspondem!';
        }

        return '';
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
                <SignUpContainer maxWidth="xs">
                    <SignUpBox>
                        <Typography variant="h5" component="h2">
                            Cadastre-se
                        </Typography>
                        {error && (
                            <Box sx={{ width: '100%' }}>
                                <Alert severity="error" sx={{ mt: 2 }}>
                                    {error}
                                </Alert>
                            </Box>
                        )}
                        <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1 }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                name="email"
                                autoComplete="email"
                                inputRef={emailRef}
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="firstName"
                                label="Nome"
                                name="firstName"
                                autoComplete="text"
                                autoFocus
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="lastName"
                                label="Sobrenome"
                                name="lastName"
                                autoComplete="text"
                                autoFocus
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
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
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                    </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirmar Senha"
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                autoComplete="current-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                                Cadastre-se
                            </SubmitButton>
                            <Grid container justifyContent="flex-start" sx={{ mt: 2 }}>
                                <Grid item>
                                    <Typography component="span" variant="body2" sx={{ color: '#727272' }}>
                                        Já possui uma conta?
                                    </Typography>
                                    <Box component="span" sx={{ mx: 0.3 }} />
                                    <Link href="/login" sx={{ color: '#0047AB', textDecoration: 'none' }}>
                                        <Typography component="span" variant="body2">
                                            Entre
                                        </Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </SignUpBox>
                </SignUpContainer>
            </Grid>
        </Grid>
    );
});
