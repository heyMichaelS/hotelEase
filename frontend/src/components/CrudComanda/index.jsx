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
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { NumericFormat } from "react-number-format";
import api from "../../api";

const CrudComanda = () => {
  const [items, setItems] = useState([]);
  const [listarNumeroQuarto, setListaNumeroQuarto] = useState([]);
  const [formData, setFormData] = useState({
    numeroQuarto: "",
    valorTotal: "",
    status: "ABERTA",
  });
  const [editingId, setEditingId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const statusLabels = {
    ABERTA: 'Aberta',
    FECHADA: 'Fechada',
    CANCELADA: 'Cancelada',
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const loadComandas = async () => {
    try {
      const response = await api.get("comanda/buscar-comanda");
      setItems(response.data);
    } catch (error) {
      console.error("Erro ao carregar comandas", error);
      showSnackbar("Erro ao carregar comandas");
    }
  };

  const loadNumeroQuarto = async () => {
    try {
      const response = await api.get("quarto/listar-numero-quarto");
      setListaNumeroQuarto(response.data);
    } catch (error) {
      console.error("Erro ao carregar numero do quarto", error);
      showSnackbar("Erro ao carregar numero do quarto");
    }
  };

  useEffect(() => {
    loadComandas();
    loadNumeroQuarto();
  }, []);

  const handleSubmit = async () => {
    const { numeroQuarto, valorTotal, status } = formData;

    if (!String(numeroQuarto).trim() || !String(valorTotal).trim()) {
      showSnackbar("Por favor, preencha todos os campos corretamente.");
      return;
    }

    try {
      if (editingId !== null) {
        await api.put(`comanda/atualizar-comanda/${editingId}`, formData);
        showSnackbar("Comanda atualizada com sucesso!");
      } else {
        await api.post("comanda/criar-comanda", formData);
        showSnackbar("Comanda criada com sucesso!");
      }
      await loadComandas();
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar comanda", error);
      showSnackbar("Erro ao salvar comanda");
    }
  };

  const handleEdit = (comanda) => {
    setFormData({
      numeroQuarto: comanda.numeroQuarto,
      valorTotal: comanda.valorTotal,
      status: comanda.status,
    });
    setEditingId(comanda.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`comanda/delete-comanda/${id}`);
      showSnackbar("Comanda removida com sucesso!");
      await loadComandas();
      resetForm();
    } catch (error) {
      console.error("Erro ao deletar comanda", error);
      showSnackbar("Erro ao deletar comanda");
    }
  };

  const resetForm = () => {
    setFormData({
      numeroQuarto: "",
      valorTotal: "",
      status: "ABERTA",
    });
    setEditingId(null);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper sx={{ p: 3 }}>
        <Stack spacing={2} direction="column">
          <Typography variant="h5" align="left" gutterBottom sx={{ fontWeight: "fine" , color: '#BC7C8F' }}>
            {editingId ? "Editar Comanda" : "Abrir Comanda"}
          </Typography>

          

          <FormControl fullWidth>
            <InputLabel>Número do Quarto</InputLabel>
            <Select
              label="Número do Quarto"
              name="numeroQuarto"
              value={formData.numeroQuarto}
              onChange={handleChange}
            >
              {listarNumeroQuarto.map((quarto) => (
                <MenuItem key={quarto.id} value={quarto.numero}>
                  {quarto.numero}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <NumericFormat
            customInput={TextField}
            label="Valor Total"
            name="valorTotal"
            value={formData.valorTotal}
            onValueChange={(values) => {
              const { value } = values;
              setFormData((prev) => ({ ...prev, valorTotal: value }));
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
              <MenuItem value="ABERTA">Aberta</MenuItem>
              <MenuItem value="FECHADA">Fechada</MenuItem>
              <MenuItem value="CANCELADA">Cancelada</MenuItem>
            </Select>
          </FormControl>

          <Stack direction="row" spacing={2}>
            <Button variant="contained" size={isMobile ? "small" : "medium"} onClick={handleSubmit}>
              {editingId !== null ? "Atualizar" : "Adicionar"}
            </Button>
            <Button variant="outlined" size={isMobile ? "small" : "medium"} onClick={resetForm}>
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
                <TableCell>Número do Quarto</TableCell>
                <TableCell>Valor Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((comanda) => (
                <TableRow key={comanda.id}>
                  <TableCell>{comanda.numeroQuarto}</TableCell>
                  <TableCell>
                    R$ {Number(comanda.valorTotal).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>{statusLabels[comanda.status]}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <IconButton onClick={() => handleEdit(comanda)} color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(comanda.id)} color="error">
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
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CrudComanda;
