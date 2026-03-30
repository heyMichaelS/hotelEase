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
    IconButton,
    Box,
    Snackbar,
    Alert,
    useMediaQuery,
    Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import api from "../../api";

const CrudCategoria = () => {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        nome: "",
        descricao: ""
    });
    const [editingId, setEditingId] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

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

    const loadCategorias = async () => {
        try {
            const response = await api.get("categoria/buscar-categoria");
            setItems(response.data);
        } catch (error) {
            console.error("Erro ao carregar categoria", error);
            showSnackbar("Erro ao carregar categoria");
        }
    };
    useEffect(() => {
        loadCategorias();
    }, []);

    const handleSubmit = async () => {
        const { nome, descricao } = formData;

        if (!String(nome).trim() || !String(descricao).trim()) {
            showSnackbar("Por favor, preencha todos os campos corretamente.");
            return;
        }

        try {
            if (editingId !== null) {
                await api.put(`categoria/atualizar-categoria/${editingId}`, formData);
                showSnackbar("Categoria atualizada com sucesso!");
            } else {
                await api.post("categoria/criar-categoria", formData);
                showSnackbar("Categoria criada com sucesso!");
            }
            await loadCategorias();
            resetForm();
        } catch (error) {
            console.error("Erro ao salvar categoria", error);
            showSnackbar("Erro ao salvar categoria");
        }
    };

    const handleEdit = (categoria) => {
        setFormData({
            nome: categoria.nome,
            descricao: categoria.descricao,
        });
        setEditingId(categoria.id);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`categoria/delete-categoria/${id}`);
            showSnackbar("Categoria removida com sucesso!");
            await loadCategorias();
            resetForm();
        } catch (error) {
            console.error("Erro ao deletar Categoria", error);
            showSnackbar("Erro ao deletar Categoria");
        }
    };
    const resetForm = () => {
        setFormData({
            nome: "",
            descricao: "",

        });
        setEditingId(null);
    };
    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Paper sx={{ p: 3 }}>
                <Stack spacing={2} direction="column">
                    <Typography variant="h5" align="left" gutterBottom sx={{ fontWeight: "fine", color: '#BC7C8F' }}>
                        {editingId ? "Editar Categoria" : "Cadastrar Categoria"}
                    </Typography>
                    <TextField
                        label="Nome da Categoria"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        fullWidth

                    />
                    <TextField
                        label="Descrição"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        fullWidth

                    />
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
                                <TableCell>Nome da Categoria</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell align="right">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((categoria) => (
                                <TableRow key={categoria.id}>
                                    <TableCell>{categoria.nome}</TableCell>
                                    <TableCell>{categoria.descricao}</TableCell>
                                    <TableCell align="right">
                                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                                            <IconButton onClick={() => handleEdit(categoria)} color="primary">
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(categoria.id)} color="error">
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

export default CrudCategoria;
