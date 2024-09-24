import React, { FC, memo, useState } from 'react';
import { Button, TextField, Box, Typography, Container, Grid, Link, Alert } from '@mui/material';
import { styled } from '@mui/system';
import DIContainer from '@web/dicontainer';
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

const ActivationContainer = styled(Container)({
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

const ActivationBox = styled(Box)({
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
    maxWidth: '500px',
    maxHeight: '50%',
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
        boxShadow: 'none',
    },
    boxShadow: 'none',
    marginTop: '20px',
});

const ResendButton = styled(Button)({
    backgroundColor: '#FFC107',
    color: 'white',
    '&:hover': {
        backgroundColor: '#e0a800',
        boxShadow: 'none',
    },
    border: 'none',
    boxShadow: 'none',
    marginTop: '10px',
});

const userService = DIContainer.getUserUseCase();

export const ActivateAccountPage: FC<Props> = memo(function ActivateAccountPage(props = {}) {
    const [activationCode, setActivationCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [activateAccountLoading, setActivateAccountLoading] = useState(false);
    const [resendEmailLoading, setResendEmailLoading] = useState(false);
    const navigate = useNavigate();

    const handleActivation = async (event: React.FormEvent) => {
        event.preventDefault();
        setActivateAccountLoading(true);
        try {
            setError('');
            setSuccess('');
            await userService.activateAccount(activationCode);
            setError('');
            navigate('/');
        } catch (error) {
            setError('Código de ativação inválido!');
        } finally {
            setActivateAccountLoading(false);
        }
    };

    const handleResendActivation = async () => {
        setResendEmailLoading(true);
        try {
            setError('');
            setSuccess('');
            await userService.resendActivationEmail();
            setSuccess('E-mail de ativação reenviado com sucesso!');
            setError('');
        } catch (error) {
            setError('Erro ao reenviar o e-mail de ativação.');
        } finally {
            setResendEmailLoading(false);
        }
    };

    return (
        <Grid container>
            <Grid item xs={12} md={6}>
                <Logo>
                    <LogoImage
                        src="/src/ui/web/assets/vnc-circular-logo.png"
                        alt="Logo Você na Câmara"
                    />
                </Logo>
            </Grid>

            <Grid item xs={12} md={6}>
                <ActivationContainer maxWidth="xs">
                    <ActivationBox>
                        <Typography variant="h5" component="h2">
                            Ativar Conta
                        </Typography>

                        {error && (
                            <Box sx={{ width: '100%' }}>
                                <Alert severity="error" sx={{ mt: 2 }}>
                                    {error}
                                </Alert>
                            </Box>
                        )}

                        {success && (
                            <Box sx={{ width: '100%' }}>
                                <Alert severity="success" sx={{ mt: 2 }}>
                                    {success}
                                </Alert>
                            </Box>
                        )}

                        <Box component="form" onSubmit={handleActivation} sx={{ mt: 1 }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="activationCode"
                                label="Código de Ativação"
                                name="activationCode"
                                autoFocus
                                value={activationCode}
                                onChange={(e) => setActivationCode(e.target.value)}
                                disabled={activateAccountLoading || resendEmailLoading}
                            />
                            <SubmitButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={activateAccountLoading || resendEmailLoading}
                                sx={{ textTransform: 'none' }}
                            >
                                {activateAccountLoading ? 'Ativando...' : 'Ativar Conta'}
                            </SubmitButton>
                            <ResendButton
                                fullWidth
                                variant="contained"
                                sx={{ textTransform: 'none' }}
                                disabled={activateAccountLoading || resendEmailLoading}
                                onClick={handleResendActivation}
                            >
                                {resendEmailLoading ? 'Reenviando...' : 'Reenviar E-mail de Ativação'}
                            </ResendButton>
                        </Box>
                    </ActivationBox>
                </ActivationContainer>
            </Grid>
        </Grid>
    );
});
