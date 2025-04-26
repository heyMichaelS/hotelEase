import React, { useState } from 'react';
import {
  Container, TextField, Button, Table, TableBody, TableCell,
  TableHead, TableRow, Paper, Stack, FormControl,
  InputLabel, Select, MenuItem, IconButton, Box,
  Snackbar, Alert, useMediaQuery
} from '@mui/material';
import { Edit, Delete, Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const CrudBasic = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    tipoUsuario: 'CLIENTE',
    cpf: '',
    telefone: '',
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSubmit = () => {
    const { nome, email, senha, cpf, telefone } = formData;
    if (!nome.trim() || !email.trim() || !senha.trim() || !cpf.trim() || !telefone.trim()) return;

    if (editingIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editingIndex] = formData;
      setItems(updatedItems);
      showSnackbar('Item atualizado com sucesso!');
      setEditingIndex(null);
    } else {
      setItems((prev) => [...prev, formData]);
      showSnackbar('Item adicionado com sucesso!');
    }

    setFormData({
      nome: '',
      email: '',
      senha: '',
      tipoUsuario: 'CLIENTE',
      cpf: '',
      telefone: '',
    });
  };

  const handleEdit = (index) => {
    setFormData(items[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
    if (editingIndex !== null) {
      if (editingIndex === index) {
        setEditingIndex(null);
        setFormData({
          nome: '',
          email: '',
          senha: '',
          tipoUsuario: 'CLIENTE',
          cpf: '',
          telefone: '',
        });
      } else if (editingIndex > index) {
        setEditingIndex((prev) => prev - 1);
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper sx={{ p: 3 }}>
        <Stack spacing={2} direction="column">
          <TextField
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="E-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Senha"
            name="senha"
            type={showPassword ? 'text' : 'password'}
            value={formData.senha}
            onChange={handleChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={toggleShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              )
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
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            fullWidth
          />
          <Button variant="contained" size={isMobile ? "small" : "medium"} onClick={handleSubmit}>
            {editingIndex !== null ? 'Atualizar' : 'Adicionar'}
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ mt: 4 }}>
        <Box sx={{ overflowX: 'auto' }}>
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
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.senha}</TableCell>
                  <TableCell>{item.tipoUsuario}</TableCell>
                  <TableCell>{item.cpf}</TableCell>
                  <TableCell>{item.telefone}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <IconButton onClick={() => handleEdit(index)} color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(index)} color="error">
                        <Delete />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CrudBasic;
