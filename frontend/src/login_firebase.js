import { auth } from './firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export async function login(email, senha) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        const token = await userCredential.user.getIdToken();

        const response = await fetch("http://localhost:8080/usuario/auth", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
            credentials: "include"
        });
        console.log("teste", token);

        if (!response.ok) throw new Error("Erro ao buscar usuário autenticado");
        console.log(auth)

        const usuario = await response.json();
        console.log("Usuário autenticado:", usuario);
        return usuario;
    } catch (error) {
        console.error("Erro no login:", error.message);
        throw error;
    }
}
