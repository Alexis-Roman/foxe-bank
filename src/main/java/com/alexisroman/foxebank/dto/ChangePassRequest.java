package com.alexisroman.foxebank.dto;

public class ChangePassRequest {
    private String oldPass;
    private String newPass;

    //SETTER & GETTERS
    public String getOldPass() {
        return oldPass;
    }

    public void setOldPass(String oldPass) {
        this.oldPass = oldPass;
    }

    public String getNewPass() {
        return newPass;
    }

    public void setNewPass(String newPass) {
        this.newPass = newPass;
    }
}
