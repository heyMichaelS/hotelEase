import React, { useState, useEffect } from 'react';
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
    Pagination,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Box,
    Snackbar,
    Alert,
    useMediaQuery
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Edit, Delete } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { NumericFormat } from 'react-number-format';
import { Typography } from '@mui/material';

import api from '../../api';

const CrudProduto = () => {
    const [items, setItems] = useState([]);
    const [categorias, setCategorias] = useState([]); 
    const [page, setPage] = useState(1);
    const rowsPerPage = 4; // Quantidade de registros por página
    const [formData, setFormData] = useState({
        nome: '',
        preco: '',
        categoria: '',
        disponivel: false,
        quantidade: '',
        unidadeMedida: '',

    });
    const statusLabels = {
        GRAMA: 'Grama',
        KILOGRAMA: 'Quilograma',
        MILILITRO: 'Mililitro',
        LITRO: 'Litro',
        UNIDADE: 'Unidade',
    };

    // Cálculo de paginação
    const totalPages = Math.ceil(items.length / rowsPerPage);
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);
    const [editingId, setEditingId] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // **FUNÇÃO QUE ESTAVA FALTANDO**
    const handleChangePage = (event, value) => {
        setPage(value);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const loadProdutos = async () => {
        try {
            const response = await api.get('produto/buscar-produto');
            setItems(response.data);
        } catch (error) {
            console.error('Erro ao carregar produto', error);
            showSnackbar('Erro ao carregar produto');
        }
    };

    
    const loadCategorias = async () => {
        try {
            const response = await api.get('categoria/buscar-categoria');
            setCategorias(response.data);
        } catch (error) {
            console.error('Erro ao carregar categorias', error);
            showSnackbar('Erro ao carregar categorias');
        }
    };

    useEffect(() => {
        loadProdutos();
        loadCategorias();
    }, []);

    const handleSubmit = async () => {
        const { nome, preco, categoria, disponivel, quantidade, unidadeMedida } = formData;
        if (!String(nome).trim() || !String(preco).trim() || !String(categoria).trim() || !String(quantidade).trim() || !String(unidadeMedida).trim()) {
            showSnackbar('Por favor, preencha todos os campos corretamente.');
            return;
        }

        try {
            if (editingId !== null) {
                await api.put(`produto/atualizar-produto/${editingId}`, formData);
                showSnackbar('Produto atualizado com sucesso!');
            } else {
                await api.post('produto/criar-produto', formData);
                showSnackbar('Produto adicionado com sucesso!');
                console.log(formData);
            }
            await loadProdutos();
            resetForm();
        } catch (error) {
            console.error('Erro ao salvar produto', error);
            showSnackbar('Erro ao salvar produto');
        }
    };

    const handleEdit = (produto) => {
        setFormData(produto);
        setEditingId(produto.id);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`produto/delete-produto/${id}`);
            showSnackbar('Produto removido com sucesso!');
            await loadProdutos();
            resetForm();
        } catch (error) {
            console.error('Erro ao deletar produto', error);
            showSnackbar('Erro ao deletar produto');
        }
    };

    const resetForm = () => {
        setFormData({
            nome: '',
            preco: '',
            categoria: '',
            disponivel: false,
            quantidade: '',
            unidadeMedida: '',
        });
        setEditingId(null);
    };


    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Paper sx={{ p: 3 }}>
                <Stack spacing={2} direction="column">

                    <Typography variant="h5" align="left" gutterBottom sx={{ fontWeight: 'fine' , color: '#BC7C8F' }}>
                        {editingId ? "Editar Produto" : "Cadastrar Produto"}
                    </Typography>
                    <TextField
                        label="Nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        fullWidth
                    />
                    <NumericFormat
                        customInput={TextField}
                        label="Preço do Produto"
                        name="preco"
                        value={formData.preco}
                        onValueChange={(values) => {
                            const { value } = values;
                            setFormData((prev) => ({ ...prev, preco: value }));
                        }}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel id="categoria-label">Categoria</InputLabel>
                        <Select
                            labelId="categoria-label"
                            name="categoria"
                            value={formData.categoria?.id || ''}
                            onChange={(e) => {
                                const categoriaSelecionada = categorias.find(c => c.id === e.target.value);
                                setFormData((prev) => ({ ...prev, categoria: categoriaSelecionada }));
                            }}
                        >
                            {categorias.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>
                                    {cat.nome}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <NumericFormat
                            customInput={TextField}
                            label="Quantidade do Produto"
                            name="quantidade"
                            value={formData.quantidade}
                            onValueChange={(values) => {
                                const { value } = values;
                                setFormData((prev) => ({ ...prev, quantidade: value }));
                            }}
                            thousandSeparator="."
                            decimalSeparator=","
                            fullWidth
                            style={{ flex: 0.5 }}
                        />

                        <FormControl fullWidth style={{ flex: 0.5 }}>
                            <InputLabel>Unidade de Medida</InputLabel>
                            <Select
                                name="unidadeMedida"
                                value={formData.unidadeMedida}
                                label="Unidade de Medida"
                                onChange={handleChange}
                            >
                                <MenuItem value="GRAMA">Grama</MenuItem>
                                <MenuItem value="KILOGRAMA">Quilograma</MenuItem>
                                <MenuItem value="MILILITRO">Mililitro</MenuItem>
                                <MenuItem value="LITRO">Litro</MenuItem>
                                <MenuItem value="UNIDADE">Unidade</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel fullWidth style={{ flex: 1 }}
                            control={
                                <Checkbox
                                    checked={formData.disponivel}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            disponivel: e.target.checked,
                                        }))
                                    }
                                />
                            }
                            label="Disponível"
                        />

                    </Stack>

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
                            <TableRow sx={{ backgroundColor: '#D8A7B1' }}>
                                <TableCell sx={{ color: '#fff' }}>Nome</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Preço</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Categoria</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Disponivel</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Quantidade</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Unidade de Medida</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#fff' }} align="center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedItems.map((produto) => (
                                <TableRow key={produto.id}>
                                    <TableCell>{produto.nome}</TableCell>
                                    <TableCell>
                                        R$ {Number(produto.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </TableCell>
                                    <TableCell>{produto.categoria?.nome}</TableCell>
                                    <TableCell>{produto.disponivel ? 'Sim' : 'Não'}</TableCell>
                                    <TableCell>{produto.quantidade}</TableCell>
                                    <TableCell>{statusLabels[produto.unidadeMedida]}</TableCell>
                                    <TableCell align="right">
                                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                                            <IconButton onClick={() => handleEdit(produto)} color="primary">
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(produto.id)} color="error">
                                                <Delete />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Paginação controlada */}
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handleChangePage}
                        variant="outlined"
                        color="secondary"
                        sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'center' }}
                    />
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

export default CrudProduto;
