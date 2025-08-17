package com.br.hotelEase.utils;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseApp initializeFirebase() throws IOException {
        Dotenv dotenv = Dotenv.load();

        Map<String, Object> credentials = new HashMap<>();
        credentials.put("type", "service_account");
        credentials.put("project_id", dotenv.get("FIREBASE_PROJECT_ID"));
        credentials.put("private_key_id", dotenv.get("FIREBASE_PRIVATE_KEY_ID"));
        credentials.put("private_key", dotenv.get("FIREBASE_PRIVATE_KEY").replace("\\n", "\n"));
        credentials.put("client_email", dotenv.get("FIREBASE_CLIENT_EMAIL"));
        credentials.put("client_id", dotenv.get("FIREBASE_CLIENT_ID"));
        credentials.put("auth_uri", dotenv.get("FIREBASE_AUTH_URI"));
        credentials.put("token_uri", dotenv.get("FIREBASE_TOKEN_URI"));
        credentials.put("auth_provider_x509_cert_url", dotenv.get("FIREBASE_AUTH_PROVIDER_CERT_URL"));
        credentials.put("client_x509_cert_url", dotenv.get("FIREBASE_CLIENT_CERT_URL"));
        credentials.put("universe_domain", dotenv.get("FIREBASE_UNIVERSE_DOMAIN"));

        String json = new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(credentials);

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(new ByteArrayInputStream(json.getBytes(StandardCharsets.UTF_8))))
                .build();

        FirebaseApp firebaseApp;
        if (FirebaseApp.getApps().isEmpty()) {
            firebaseApp = FirebaseApp.initializeApp(options);
        } else {
            firebaseApp = FirebaseApp.getInstance();
        }

        return firebaseApp;
    }


//    public FirebaseApp firebaseApp() throws IOException {
//        FileInputStream serviceAccount = new FileInputStream("src/main/resources/firebase/serviceAccountKey.json");
//
//        FirebaseOptions options = FirebaseOptions.builder()
//                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//                .build();
//
//        return FirebaseApp.initializeApp(options);
//    }
}