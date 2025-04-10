package com.br.hotelEase.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
public class MensagemService {

    @Autowired
    private MessageSource messageSource;

    public String getMensagem(String chave, Object... parametros) {
        return messageSource.getMessage(chave, parametros, Locale.getDefault());
    }
}