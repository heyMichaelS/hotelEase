import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Stack, FormControl, InputLabel, Select, MenuItem, IconButton, Box, Snackbar, Alert, useMediaQuery } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { NumericFormat } from 'react-number-format';
import api from '../../api';

const CrudQuarto = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    numero: '',
    tipo: '',
    precoDiaria: '',
    status: 'DISPONIVEL',
  });
  const [editingId, setEditingId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const loadQuartos = async () => {
    try {
      const response = await api.get('quarto/buscar-quarto');
      setItems(response.data);
    } catch (error) {
      console.error('Erro ao carregar quartos', error);
      showSnackbar('Erro ao carregar quartos');
    }
  };

  useEffect(() => {
    loadQuartos();
  }, []);

  const handleSubmit = async () => {
    const { numero, tipo, precoDiaria, status } = formData;
  
    if (!String(numero).trim() || !String(tipo).trim() || !String(precoDiaria).trim()) {
      showSnackbar('Por favor, preencha todos os campos corretamente.');
      return;
    }
  
    try {
      if (editingId !== null) {
        await api.put(`quarto/atualizar-quarto/${editingId}`, formData);
        showSnackbar('Quarto atualizado com sucesso!');
      } else {
        await api.post('quarto/criar-quarto', formData);
        showSnackbar('Quarto adicionado com sucesso!');
      }
      await loadQuartos();
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar quarto', error);
      showSnackbar('Erro ao salvar quarto');
    }
  };
  
  const handleEdit = (quarto) => {
    setFormData(quarto);
    setEditingId(quarto.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`quarto/delete-quarto/${id}`);
      showSnackbar('Quarto removido com sucesso!');
      await loadQuartos();
      resetForm();
    } catch (error) {
      console.error('Erro ao deletar quarto', error);
      showSnackbar('Erro ao deletar quarto');
    }
  };

  const resetForm = () => {
    setFormData({
      numero: '',
      tipo: '',
      precoDiaria: '',
      status: 'DISPONIVEL',
    });
    setEditingId(null);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper sx={{ p: 3 }}>
        <Stack spacing={2} direction="column">
          <TextField
            label="Número"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            fullWidth
          />
          <NumericFormat
            customInput={TextField}
            label="Preço da Diária"
            name="precoDiaria"
            value={formData.precoDiaria}
            onValueChange={(values) => {
              const { value } = values;
              setFormData((prev) => ({ ...prev, precoDiaria: value }));
            }}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="DISPONIVEL">Disponível</MenuItem>
              <MenuItem value="OCUPADO">Ocupado</MenuItem>
              <MenuItem value="MANUTENCAO">Manutenção</MenuItem>
            </Select>
          </FormControl>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" size={isMobile ? 'small' : 'medium'} onClick={handleSubmit}>
              {editingId !== null ? 'Atualizar' : 'Adicionar'}
            </Button>
            <Button variant="outlined" size={isMobile ? 'small' : 'medium'} onClick={resetForm}>
              Limpar
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Paper sx={{ mt: 4 }}>
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Número</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Preço da Diária</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((quarto) => (
                <TableRow key={quarto.id}>
                  <TableCell>{quarto.numero}</TableCell>
                  <TableCell>{quarto.tipo}</TableCell>
                  <TableCell>R$ {Number(quarto.precoDiaria).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell>{quarto.status}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <IconButton onClick={() => handleEdit(quarto)} color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(quarto.id)} color="error">
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

export default CrudQuarto;