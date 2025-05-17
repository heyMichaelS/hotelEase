import * as React from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
  Paper,
  Divider,
  IconButton,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { login } from "../../login_firebase";
import { auth } from "../../firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import hotelTheme from "../../theme";

export default function SignIn() {
  const theme = useTheme();
  const isMobile = useMediaQuery(hotelTheme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(hotelTheme.breakpoints.down("md"));
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      setLoading(true);
      const usuario = await login(email, password);
      console.log("Usuário autenticado:", usuario);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      setError(null);
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const response = await fetch("http://localhost:8080/usuario/auth", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Erro ao autenticar com o backend"
        );
      }

      const usuario = await response.json();
      console.log("Usuário autenticado com Google:", usuario);
      navigate("/");
    } catch (error) {
      console.error("Erro no login com Google:", error);
      setError(error.message || "Erro ao fazer login com Google");
      try {
        await auth.signOut();
      } catch (logoutError) {
        console.error("Erro ao fazer logout:", logoutError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleCloseError = () => setError(null);

  return (
    <ThemeProvider theme={hotelTheme}>
      <Box
        sx={{
          marginTop: "2vh",
          minHeight: "96vh",
          backgroundImage: isTablet
            ? "none"
            : 'url("https://raw.githubusercontent.com/heyMichaelS/hotelEase/53835ac2312574ad7f63c90ffd415abf81e456e5/documentation/Imagens/login.jpg")',
          backgroundColor: isTablet ? "#f0f0f0" : "transparent",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          "&::before": {
            content: isTablet ? "none" : '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            zIndex: 0,
          },
        }}
      >
        <CssBaseline />
        <Container
          component="main"
          maxWidth="xs"
          disableGutters
          sx={{
            position: "relative",
            zIndex: 1,
            px: 2,
            width: "100%",
          }}
        >
          <Paper
            elevation={6}
            sx={{
              borderRadius: 3,
              padding: isMobile ? 3 : 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              position: "relative",
            }}
          >
            {loading && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  borderRadius: 3,
                  zIndex: 10,
                }}
              >
                <CircularProgress size={60} />
              </Box>
            )}

            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant={isMobile ? "h6" : "h5"}
              sx={{ mb: 2 }}
            >
              Entrar
            </Typography>

            <Button
              onClick={handleGoogleSignIn}
              disabled={loading}
              fullWidth
              variant="contained"
              startIcon={<GoogleIcon />}
              sx={{
                backgroundColor: "#ffffff",
                color: "rgba(0,0,0,0.6)",
                border: "1px solid #dadce0",
                textTransform: "none",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "#f7f7f7",
                  border: "1px solid #c6c6c6",
                },
                mb: 2,
              }}
            >
              Entrar com Google
            </Button>

            <Divider sx={{ width: "100%", my: 2 }}>Ou</Divider>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ width: "100%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                disabled={loading}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        disabled={loading}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
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
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Entrar"}
              </Button>

              <Grid
                container
                direction={isMobile ? "column" : "row"}
                spacing={1}
                sx={{ justifyContent: "space-between", textAlign: "center" }}
              >
                <Grid item xs={12} sm={6}>
                  <Link
                    href="#"
                    variant="body2"
                    sx={{ textDecoration: "none" }}
                  >
                    Esqueceu a senha?
                  </Link>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Link
                    href="/cadastro"
                    variant="body2"
                    sx={{ textDecoration: "none" }}
                  >
                    Não tem uma conta? Cadastre-se
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseError}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}
