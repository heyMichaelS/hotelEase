import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Avatar,
  Button,
  Divider,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CssBaseline,
  CircularProgress,
} from "@mui/material";
import {
  PersonAdd,
  Hotel,
  Logout,
  Receipt,
  Restaurant,
  RoomService,
  Fastfood,
  AddShoppingCart,
  CheckCircleOutline,
  Assignment,
  AccountCircle,
} from "@mui/icons-material";
import { styled, alpha, useTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { auth } from "../../firebase-config";

import CadastroQuarto from "../CrudQuarto";
import CrudCliente from "../CrudCliente";


import hotelTheme from "../../theme";

const componentesPorPagina = {
  "Cadastro de Cliente": <CrudCliente />,
  "Cadastro de Quarto": <CadastroQuarto />,
};

const menuPorSetor = {
  Recepção: [
    "Cadastro de Cliente",
    "Nova Reserva (Check-in)",
    "Check-out Manual",
    "Cadastro de Quarto",
  ],
  Cozinha: [
    "Cadastro de Produto",
    "Painel de Pedidos (Tempo Real)",
    "Adicionar Pedido",
  ],
  Financeiro: [
    "Fatura Detalhada",
    "Registro de Pagamento",
    "Relatório por Quarto",
    "Integração com Pagamentos",
  ],
  Serviços: ["Abrir Comanda", "Consumos Extras"],
};

const Pesquisa = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
  },
  width: "100%",
}));

const WrapperIconePesquisa = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const CampoPesquisa = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

const MenuCustomizado = styled(MuiMenu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: alpha(theme.palette.background.paper, 0.95),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    minWidth: 220,
    padding: theme.spacing(1),
  },
}));

const ItemMenuCustomizado = styled(MuiMenuItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius / 1.5,
  padding: theme.spacing(1.2, 2),
  fontWeight: 500,
  fontSize: "0.95rem",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  transition: "all 0.2s",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
  },
}));

const obterIcone = (rotulo) => {
  const icones = {
    "Cadastro de Cliente": <PersonAdd fontSize="small" />,
    "Nova Reserva (Check-in)": <Hotel fontSize="small" />,
    "Check-out Manual": <Logout fontSize="small" />,
    "Cadastro de Quarto": <RoomService fontSize="small" />,
    "Cadastro de Produto": <Fastfood fontSize="small" />,
    "Painel de Pedidos (Tempo Real)": <Restaurant fontSize="small" />,
    "Adicionar Pedido": <AddShoppingCart fontSize="small" />,
    "Fatura Detalhada": <Receipt fontSize="small" />,
    "Registro de Pagamento": <Assignment fontSize="small" />,
    "Relatório por Quarto": <CheckCircleOutline fontSize="small" />,
    "Integração com Pagamentos": <Assignment fontSize="small" />,
    "Abrir Comanda": <RoomService fontSize="small" />,
    "Consumos Extras": <Fastfood fontSize="small" />,
  };
  return icones[rotulo] || <Assignment fontSize="small" />;
};

function BarraAppCustomizada({ definirPaginaAtual }) {
  const [ancora, setAncora] = React.useState({});
  const [ancoraUsuario, setAncoraUsuario] = React.useState(null);
  const [gavetaAberta, setGavetaAberta] = React.useState(false);
  const [carregandoLogout, setCarregandoLogout] = React.useState(false);

  const tema = useTheme();
  const ehMobile = useMediaQuery(tema.breakpoints.down("md"));

  const fazerLogout = async () => {
    setCarregandoLogout(true);
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (erro) {
      console.error("Erro ao fazer logout:", erro);
      setCarregandoLogout(false);
    }
  };

  const abrirMenu = (setor) => (evento) => {
    setAncora((prev) => ({ ...prev, [setor]: evento.currentTarget }));
  };

  const fecharMenu = (setor) => () => {
    setAncora((prev) => ({ ...prev, [setor]: null }));
  };

  const clicarUsuario = (evento) => {
    setAncoraUsuario(evento.currentTarget);
  };

  const fecharMenuUsuario = () => {
    setAncoraUsuario(null);
  };

  const alternarGaveta = (abrir) => () => {
    setGavetaAberta(abrir);
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ borderRadius: "0 0 16px 16px" }}
      >
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", px: 2 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {ehMobile && (
              <IconButton onClick={alternarGaveta(true)} color="inherit">
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              HotelControl
            </Typography>
          </Box>

          {!ehMobile && (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {Object.keys(menuPorSetor).map((setor) => (
                <div key={setor}>
                  <Button
                    color="inherit"
                    endIcon={<ArrowDropDownIcon />}
                    onClick={abrirMenu(setor)}
                  >
                    {setor}
                  </Button>
                  <MenuCustomizado
                    anchorEl={ancora[setor]}
                    open={Boolean(ancora[setor])}
                    onClose={fecharMenu(setor)}
                  >
                    {menuPorSetor[setor].map((item, indice) => (
                      <React.Fragment key={item}>
                        <ItemMenuCustomizado
                          onClick={() => {
                            definirPaginaAtual(item);
                            fecharMenu(setor)();
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 28 }}>
                            {obterIcone(item)}
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </ItemMenuCustomizado>
                        {indice < menuPorSetor[setor].length - 1 && (
                          <Divider sx={{ my: 0.5 }} />
                        )}
                      </React.Fragment>
                    ))}
                  </MenuCustomizado>
                </div>
              ))}
            </Box>
          )}

          {!ehMobile && (
            <Box sx={{ flexGrow: 1, maxWidth: 400, mx: 2 }}>
              <Pesquisa>
                <WrapperIconePesquisa>
                  <SearchIcon />
                </WrapperIconePesquisa>
                <CampoPesquisa
                  placeholder="Buscar..."
                  inputProps={{ "aria-label": "search" }}
                />
              </Pesquisa>
            </Box>
          )}

          <Box>
            <IconButton onClick={clicarUsuario}>
              <Avatar alt="Usuário" src="/user.jpg" />
            </IconButton>
            <MuiMenu
              anchorEl={ancoraUsuario}
              open={Boolean(ancoraUsuario)}
              onClose={fecharMenuUsuario}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <MuiMenuItem onClick={fecharMenuUsuario}>
                <ListItemIcon>
                  <AccountCircle fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Perfil" />
              </MuiMenuItem>
              <MuiMenuItem
                onClick={() => {
                  fecharMenuUsuario();
                  fazerLogout();
                }}
                disabled={carregandoLogout}
              >
                <ListItemIcon>
                  {carregandoLogout ? (
                    <CircularProgress size={20} />
                  ) : (
                    <Logout fontSize="small" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={carregandoLogout ? "Saindo..." : "Sair"}
                />
              </MuiMenuItem>
            </MuiMenu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={gavetaAberta}
        onClose={alternarGaveta(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ zIndex: (tema) => tema.zIndex.appBar + 1 }}
      >
        <Box
          sx={{
            width: 280,
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={alternarGaveta(false)}>
              <MenuIcon />
            </IconButton>
          </Box>

          {Object.keys(menuPorSetor).map((setor) => (
            <Box key={setor}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, mb: 1, color: "text.secondary" }}
              >
                {setor}
              </Typography>
              <List dense>
                {menuPorSetor[setor].map((item) => (
                  <ListItem
                    button
                    key={item}
                    onClick={() => {
                      definirPaginaAtual(item);
                      alternarGaveta(false)();
                    }}
                    sx={{
                      borderRadius: 1,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      px: 2,
                      "&:hover": {
                        backgroundColor: alpha(tema.palette.primary.main, 0.1),
                        color: tema.palette.primary.main,
                      },
                      "&:active": {
                        backgroundColor: alpha(tema.palette.primary.main, 0.2),
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      {obterIcone(item)}
                    </ListItemIcon>
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

export default function BarraAppTematizada() {
  const [paginaAtual, setPaginaAtual] = React.useState("Cadastro de Quarto");

  return (
    <ThemeProvider theme={hotelTheme}>
      <CssBaseline />
      <BarraAppCustomizada definirPaginaAtual={setPaginaAtual} />
      <Box component="main" sx={{ mt: { xs: 8, sm: 10 }, p: 3 }}>
        {componentesPorPagina[paginaAtual] || (
          <Typography>Selecione uma opção no menu</Typography>
        )}
      </Box>
    </ThemeProvider>
  );
}