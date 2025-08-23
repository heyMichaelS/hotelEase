import { auth } from './firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import api from './api'; // seu axios com interceptor

export async function login(email, senha) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    console.log("Usuário logado:", userCredential.user.email);

    const usuario = await api.get("/usuario/auth");
    console.log("Usuário autenticado:", usuario.data);

    return usuario.data;
  } catch (error) {
    console.error("Erro no login:", error.message);
    throw error;
  }
}

