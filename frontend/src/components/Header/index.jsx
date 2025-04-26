import * as React from 'react';
import {
  AppBar, Box, Toolbar, Typography, InputBase, IconButton,
  Avatar, Button, Divider, Menu as MuiMenu, MenuItem as MuiMenuItem,
  useMediaQuery, Drawer, List, ListItem, ListItemText, ListItemIcon,
  CssBaseline
} from '@mui/material';
import {
  PersonAdd, Hotel, Logout, Receipt, Restaurant, RoomService,
  Fastfood, Tablet, AddShoppingCart, CheckCircleOutline, Assignment, AccountCircle
} from '@mui/icons-material';
import {
  styled, alpha, useTheme, ThemeProvider, createTheme
} from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import CadastroQuarto from '../CrudQuarto';
import CadastroCliente from '../CrudCliente';

const pageComponents = {
  "Cadastro de Quarto": <CadastroQuarto />,
  "Cadastro de Cliente": <CadastroCliente />,

};

const menuPorSetor = {
  Recepção: [
    "Cadastro de Cliente",
    "Nova Reserva (Check-in)",
    "Check-out Manual",
    "Cadastro de Quarto"
  ],
  Cozinha: [
    "Cadastro de Produto",
    "Painel de Pedidos (Real-Time)",
    "Adicionar Pedido"
  ],
  Financeiro: [
    "Fatura Detalhada",
    "Registro de Pagamento",
    "Relatório por Quarto",
    "Integração com Pagamentos"
  ],
  Serviços: [
    "Abrir Comanda",
    "Consumos Extras",
  ]
};

const hotelTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0F172A' },
    secondary: { main: '#10B981' },
    background: { default: '#F9FAFB', paper: '#FFFFFF' },
    text: { primary: '#111827', secondary: '#6B7280' },
    error: { main: '#DC2626' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: { textTransform: 'none' },
  },
  components: {
    MuiPaper: {
      styleOverrides: { root: { borderRadius: 12 } },
    },
    MuiButton: {
      styleOverrides: { root: { borderRadius: 12, fontWeight: 500 } },
    },
  },
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
  },
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

const CustomMenu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: alpha(theme.palette.background.paper, 0.95),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    minWidth: 220,
    padding: theme.spacing(1),
  },
}));

const CustomMenuItem = styled(MuiMenuItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius / 1.5,
  padding: theme.spacing(1.2, 2),
  fontWeight: 500,
  fontSize: '0.95rem',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
  },
}));

const getIcon = (label) => {
  const icons = {
    "Cadastro de Cliente": <PersonAdd fontSize="small" />,
    "Nova Reserva (Check-in)": <Hotel fontSize="small" />,
    "Check-out Manual": <Logout fontSize="small" />,
    "Cadastro de Quarto": <RoomService fontSize="small" />,
    "Cadastro de Produto": <Fastfood fontSize="small" />,
    "Painel de Pedidos (Real-Time)": <Restaurant fontSize="small" />,
    "Adicionar Pedido": <AddShoppingCart fontSize="small" />,
    "Fatura Detalhada": <Receipt fontSize="small" />,
    "Registro de Pagamento": <Assignment fontSize="small" />,
    "Relatório por Quarto": <CheckCircleOutline fontSize="small" />,
    "Integração com Pagamentos": <Assignment fontSize="small" />,
    "Abrir Comanda": <RoomService fontSize="small" />,
    "Consumos Extras": <Fastfood fontSize="small" />,
  };
  return icons[label] || <Assignment fontSize="small" />;
};

function CustomAppBar({ setCurrentPage }) {
  const [anchorEl, setAnchorEl] = React.useState({});
  const [userAnchor, setUserAnchor] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpen = (setor) => (event) => {
    setAnchorEl((prev) => ({ ...prev, [setor]: event.currentTarget }));
  };

  const handleClose = (setor) => () => {
    setAnchorEl((prev) => ({ ...prev, [setor]: null }));
  };

  const handleUserClick = (event) => {
    setUserAnchor(event.currentTarget);
  };

  const handleUserClose = () => {
    setUserAnchor(null);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="fixed" color="primary" sx={{ borderRadius: '0 0 16px 16px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile && (
              <IconButton onClick={toggleDrawer(true)} color="inherit">
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              HotelControl
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {Object.keys(menuPorSetor).map((setor) => (
                <div key={setor}>
                  <Button
                    color="inherit"
                    endIcon={<ArrowDropDownIcon />}
                    onClick={handleOpen(setor)}
                  >
                    {setor}
                  </Button>
                  <CustomMenu
                    anchorEl={anchorEl[setor]}
                    open={Boolean(anchorEl[setor])}
                    onClose={handleClose(setor)}
                  >
                    {menuPorSetor[setor].map((item, index) => (
                      <React.Fragment key={item}>
                        <CustomMenuItem
                          onClick={() => {
                            setCurrentPage(item);
                            handleClose(setor)();
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 28 }}>{getIcon(item)}</ListItemIcon>
                          <ListItemText primary={item} />
                        </CustomMenuItem>
                        {index < menuPorSetor[setor].length - 1 && <Divider sx={{ my: 0.5 }} />}
                      </React.Fragment>
                    ))}
                  </CustomMenu>
                </div>
              ))}
            </Box>
          )}

          {!isMobile && (
            <Box sx={{ flexGrow: 1, maxWidth: 400, mx: 2 }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Buscar..." inputProps={{ 'aria-label': 'search' }} />
              </Search>
            </Box>
          )}

          <Box>
            <IconButton onClick={handleUserClick}>
              <Avatar alt="Usuário" src="/user.jpg" />
            </IconButton>
            <MuiMenu
              anchorEl={userAnchor}
              open={Boolean(userAnchor)}
              onClose={handleUserClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <MuiMenuItem onClick={handleUserClose}>
                <ListItemIcon><AccountCircle fontSize="small" /></ListItemIcon>
                <ListItemText primary="Perfil" />
              </MuiMenuItem>
              <MuiMenuItem onClick={handleUserClose}>
                <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                <ListItemText primary="Sair" />
              </MuiMenuItem>
            </MuiMenu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 1 }}
      >
        <Box sx={{ width: 280, p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <MenuIcon />
            </IconButton>
          </Box>

          {Object.keys(menuPorSetor).map((setor) => (
            <Box key={setor}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: 'text.secondary' }}>
                {setor}
              </Typography>
              <List dense>
                {menuPorSetor[setor].map((item) => (
                  <ListItem
                    button
                    key={item}
                    onClick={() => {
                      setCurrentPage(item);
                      toggleDrawer(false)();
                    }}
                    sx={{
                      borderRadius: 1,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      px: 2,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      },
                      '&:active': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 28 }}>{getIcon(item)}</ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 1.5 }} />
            </Box>
          ))}
        </Box>
      </Drawer>
    </>
  );
}

export default function ThemedAppBar() {
  const [currentPage, setCurrentPage] = React.useState("Cadastro de Quarto");

  return (
    <ThemeProvider theme={hotelTheme}>
      <CssBaseline />
      <CustomAppBar setCurrentPage={setCurrentPage} />
      <Box component="main" sx={{ mt: { xs: 8, sm: 10 }, p: 3 }}>
        {pageComponents[currentPage] || <Typography>Selecione uma opção no menu</Typography>}
      </Box>
    </ThemeProvider>
  );
}
