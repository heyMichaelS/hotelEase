import React, { useState } from 'react';
import {
  Container, TextField, Button, Paper, Stack, FormControl,
  InputLabel, Select, MenuItem, IconButton, Snackbar, Alert, useMediaQuery,
  Box, GlobalStyles
} from '@mui/material';
import { Visibility, VisibilityOff, Google as GoogleIcon } from '@mui/icons-material';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase-config';
import api from '../../api';
import hotelTheme from '../../theme';

const CriarUsuario = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    tipoUsuario: 'CLIENTE',
    cpf: '',
    telefone: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [errors, setErrors] = useState({
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    telefone: '',
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const formatarTelefone = (value) => {
    value = value.replace(/\D/g, '').slice(0, 11);
    if (value.length === 11) return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    if (value.length <= 2) return `(${value}`;
    if (value.length <= 7) return value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    return value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  };

  const handleTelefoneChange = (e) => {
    setFormData((prev) => ({ ...prev, telefone: formatarTelefone(e.target.value) }));
    setErrors((prev) => ({ ...prev, telefone: '' }));
  };

  const formatarCPF = (value) => {
    value = value.replace(/\D/g, '').slice(0, 11);
    if (value.length <= 3) return value;
    if (value.length <= 6) return value.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    if (value.length <= 9) return value.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
  };

  const handleCpfChange = (e) => {
    setFormData((prev) => ({ ...prev, cpf: formatarCPF(e.target.value) }));
    setErrors((prev) => ({ ...prev, cpf: '' }));
  };

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validateCPF = (cpf) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);

  const validateForm = () => {
    let isValid = true;
    let validationErrors = {};

    if (!formData.nome.trim()) {
      validationErrors.nome = 'O nome é obrigatório.';
      isValid = false;
    }

    if (!formData.email.trim()) {
      validationErrors.email = 'O e-mail é obrigatório.';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      validationErrors.email = 'E-mail inválido.';
      isValid = false;
    }

    if (!formData.senha.trim()) {
      validationErrors.senha = 'A senha é obrigatória.';
      isValid = false;
    }

    if (!formData.cpf.trim()) {
      validationErrors.cpf = 'O CPF é obrigatório.';
      isValid = false;
    } else if (!validateCPF(formData.cpf)) {
      validationErrors.cpf = 'CPF inválido.';
      isValid = false;
    }

    if (!formData.telefone.trim()) {
      validationErrors.telefone = 'O telefone é obrigatório.';
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await api.post('/usuario/criar-usuario', formData);
      showSnackbar('Usuário criado com sucesso!');
      setFormData({ nome: '', email: '', senha: '', tipoUsuario: 'CLIENTE', cpf: '', telefone: '' });
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error('Erro ao criar usuário', error);
      showSnackbar('Problema ao criar usuário, tente novamente.');
    }
  };

  const cadastrarComGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Usuário logado com Google:", user);
      showSnackbar("Cadastro com Google realizado!");

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error("Erro no login com Google", error);
      showSnackbar("Erro ao cadastrar com Google");
    }
  };

  return (
    <ThemeProvider theme={hotelTheme}>
      <>
        <GlobalStyles styles={{ html: { height: '100%', overflow: 'hidden' }, body: { height: '100%', margin: 0, overflow: 'hidden' } }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundImage: 'url("https://images.pexels.com/photos/12277406/pexels-photo-12277406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Container maxWidth="sm">
            <Paper
              sx={{
                p: 4,
                borderRadius: '20px',
                boxShadow: 'none',
                backdropFilter: 'blur(0px)',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                border: 'none',
              }}
            >
              <Stack spacing={3}>
                <TextField
                  label="Nome completo"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  error={!!errors.nome}
                  helperText={errors.nome}
                />
                <TextField
                  label="E-mail"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <TextField
                  label="Senha"
                  name="senha"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.senha}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  error={!!errors.senha}
                  helperText={errors.senha}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={toggleShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Tipo de Usuário</InputLabel>
                  <Select
                    name="tipoUsuario"
                    value={formData.tipoUsuario}
                    label="Tipo de Usuário"
                    onChange={handleChange}
                  >
                    <MenuItem value="CLIENTE">Cliente</MenuItem>
                    <MenuItem value="FUNCIONARIO">Funcionário</MenuItem>
                    <MenuItem value="ADMIN">Admin</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="CPF"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleCpfChange}
                  fullWidth
                  variant="outlined"
                  error={!!errors.cpf}
                  helperText={errors.cpf}
                />
                <TextField
                  label="Telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleTelefoneChange}
                  fullWidth
                  variant="outlined"
                  error={!!errors.telefone}
                  helperText={errors.telefone}
                />
                <Button
                  variant="contained"
                  size={isMobile ? 'small' : 'large'}
                  onClick={handleSubmit}
                  sx={{ borderRadius: '10px' }}
                >
                  Criar Conta
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  onClick={cadastrarComGoogle}
                  sx={{ borderRadius: '10px' }}
                >
                  Cadastrar com Google
                </Button>
              </Stack>
            </Paper>

            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
              <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Container>
        </Box>
      </>
    </ThemeProvider>
  );
};

export default CriarUsuario;
