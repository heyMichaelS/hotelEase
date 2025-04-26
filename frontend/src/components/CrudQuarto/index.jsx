import React, { useState } from 'react';
import {
  Container, TextField, Button, Table, TableBody, TableCell,
  TableHead, TableRow, Paper, Stack, FormControl,
  InputLabel, Select, MenuItem, IconButton, Box,
  Snackbar, Alert, useMediaQuery
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { NumericFormat } from 'react-number-format';

const CrudBasic = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    numero: '',
    tipo: '',
    precoDiaria: '',
    status: 'DISPONIVEL',
  });
  const [editingIndex, setEditingIndex] = useState(null);
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

  const handleSubmit = () => {
    const { numero, tipo, precoDiaria } = formData;
    if (!numero.trim() || !tipo.trim() || !precoDiaria.trim()) return;

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

    setFormData({ numero: '', tipo: '', precoDiaria: '', status: 'DISPONIVEL' });
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
        setFormData({ numero: '', tipo: '', precoDiaria: '', status: 'DISPONIVEL' });
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
                <TableCell>Número</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Preço da Diária</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.numero}</TableCell>
                  <TableCell>{item.tipo}</TableCell>
                  <TableCell>R$ {Number(item.precoDiaria).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell>{item.status}</TableCell>
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
