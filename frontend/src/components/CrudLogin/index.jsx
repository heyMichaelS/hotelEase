import * as React from 'react';
import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container, CssBaseline, Paper, Divider, IconButton, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const theme = createTheme();

export default function SignIn() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detecta se é mobile
  const [showPassword, setShowPassword] = React.useState(false); // Estado para mostrar/ocultar a senha

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const handleGoogleSignIn = () => {
    console.log('Login com Google clicado');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword); // Alterna o estado de mostrar/ocultar senha
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CssBaseline />
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: 450,
            borderRadius: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Entrar
          </Typography>

          <Button
            onClick={handleGoogleSignIn}
            fullWidth
            variant="contained"
            startIcon={<GoogleIcon />}
            sx={{
              backgroundColor: '#ffffff',
              color: 'rgba(0,0,0,0.6)',
              border: '1px solid #dadce0',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#f7f7f7',
                border: '1px solid #c6c6c6',
              },
              mb: 2,
            }}
          >
            Entrar com Google
          </Button>

          <Divider sx={{ width: '100%', my: 2 }}>Ou</Divider>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type={showPassword ? 'text' : 'password'} // Altera o tipo com base no estado
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword} // Alterna o estado de mostrar/ocultar a senha
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>

            <Grid container spacing={2} sx={{ justifyContent: 'space-between', textAlign: 'center' }}>
              <Grid item xs={12} sm={6}>
                <Link href="#" variant="body2" sx={{ textDecoration: 'none' }}>
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Link href="#" variant="body2" sx={{ textDecoration: 'none' }}>
                  {"Não tem uma conta? Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
