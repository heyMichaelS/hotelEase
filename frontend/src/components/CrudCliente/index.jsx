import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Box,
  Snackbar,
  Alert,
  useMediaQuery,
} from "@mui/material";
import { Edit, Delete, Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import api from "../../api";

const CrudUsuario = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    tipoUsuario: "CLIENTE",
    cpf: "",
    telefone: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const loadUsuarios = async () => {
    try {
      const response = await api.get("/usuario/buscar-usuario");
      if (Array.isArray(response.data)) {
        setItems(response.data);
      } else {
        showSnackbar("Erro ao carregar usuários");
      }
    } catch (error) {
      showSnackbar("Erro ao carregar usuários");
    }
  };

  useEffect(() => {
    loadUsuarios();
  }, []);

  const formatarTelefone = (value) => {
    value = value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length === 11) {
      return value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    if (value.length <= 2) return `(${value}`;
    if (value.length <= 7) return value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    return value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  };

  const handleTelefoneChange = (e) => {
    let value = e.target.value;
    value = formatarTelefone(value);
    setFormData((prev) => ({ ...prev, telefone: value }));
  };

  const formatarCPF = (value) => {
    value = value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length <= 3) return value;
    if (value.length <= 6) return value.replace(/(\d{3})(\d{0,3})/, "$1.$2");
    if (value.length <= 9)
      return value.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
  };

  const handleCpfChange = (e) => {
    let value = e.target.value;
    value = formatarCPF(value);
    setFormData((prev) => ({ ...prev, cpf: value }));
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validateCPF = (cpf) => {
    const re = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return re.test(cpf);
  };

  const validateSenha = (senha) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return re.test(senha);
  };

  const validateForm = () => {
    let isValid = true;
    let validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "O e-mail é obrigatório.";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      validationErrors.email = "O e-mail deve estar no formato correto.";
      isValid = false;
    }

    if (!formData.senha.trim()) {
      validationErrors.senha = "A senha é obrigatória.";
      isValid = false;
    } else if (!validateSenha(formData.senha)) {
      validationErrors.senha =
        "A senha deve ter no mínimo 6 caracteres, com letras e números.";
      isValid = false;
    }

    if (!formData.cpf.trim()) {
      validationErrors.cpf = "O CPF é obrigatório.";
      isValid = false;
    } else if (!validateCPF(formData.cpf)) {
      validationErrors.cpf =
        "O CPF deve estar no formato correto (xxx.xxx.xxx-xx).";
      isValid = false;
    }

    if (!formData.telefone.trim()) {
      validationErrors.telefone = "O telefone é obrigatório.";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    const { nome, email, senha, cpf, telefone, tipoUsuario } = formData;

    if (
      !nome.trim() ||
      !email.trim() ||
      !senha.trim() ||
      !cpf.trim() ||
      !telefone.trim()
    ) {
      showSnackbar("Todos os campos são obrigatórios.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      if (editingId !== null) {
        await api.put(`/usuario/atualizar-usuario/${editingId}`, formData);
        showSnackbar("Usuário atualizado com sucesso!");
      } else {
        await api.post("/usuario/criar-usuario", formData);
        showSnackbar("Usuário adicionado com sucesso!");
      }

      await loadUsuarios();
      resetForm();
    } catch (error) {
      showSnackbar("Erro ao salvar usuário");
    }
  };

  const handleEdit = (usuario) => {
    setFormData(usuario);
    setEditingId(usuario.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/usuario/delete-usuario/${id}`);
      showSnackbar("Usuário removido com sucesso!");
      await loadUsuarios();
      resetForm();
    } catch (error) {
      showSnackbar("Erro ao deletar usuário");
    }
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      email: "",
      senha: "",
      tipoUsuario: "CLIENTE",
      cpf: "",
      telefone: "",
    });
    setEditingId(null);
    showSnackbar("Formulário limpo!");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper sx={{ p: 3 }}>
        <Stack spacing={2} direction="column">
          <TextField
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-zÀ-ÿ\s]*$/.test(value)) {
                setFormData((prev) => ({ ...prev, nome: value }));
              }
            }}
            inputProps={{ inputMode: "text" }}
            fullWidth
          />
          <TextField
            label="E-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Senha"
            name="senha"
            type={showPassword ? "text" : "password"}
            value={formData.senha}
            onChange={handleChange}
            fullWidth
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
          <FormControl fullWidth>
            <InputLabel>Tipo Usuário</InputLabel>
            <Select
              name="tipoUsuario"
              value={formData.tipoUsuario}
              label="Tipo Usuário"
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
            error={!!errors.cpf}
            helperText={errors.cpf}
          />
          <TextField
            label="Telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleTelefoneChange}
            fullWidth
            error={!!errors.telefone}
            helperText={errors.telefone}
          />
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size={isMobile ? "small" : "medium"}
              onClick={handleSubmit}
            >
              {editingId !== null ? "Atualizar" : "Adicionar"}
            </Button>
            <Button
              variant="outlined"
              size={isMobile ? "small" : "medium"}
              onClick={resetForm}
            >
              Limpar
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Paper sx={{ mt: 4 }}>
        <Box sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Senha</TableCell>
                <TableCell>Tipo Usuário</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length > 0 ? (
                items.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>{usuario.nome}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>{usuario.senha}</TableCell>
                    <TableCell>{usuario.tipoUsuario}</TableCell>
                    <TableCell>{usuario.cpf}</TableCell>
                    <TableCell>{usuario.telefone}</TableCell>
                    <TableCell align="right">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                      >
                        <IconButton
                          onClick={() => handleEdit(usuario)}
                          color="primary"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(usuario.id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Nenhum usuário encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CrudUsuario;
