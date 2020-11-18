package org.gerbil.asbplayer.model;

import com.fasterxml.jackson.annotation.JsonValue;

public enum FileType {

    SUBTITLE("subtitle"),
    AUDIO("audio"),
    DIRECTORY("directory");

    private final String name;

    FileType(String name) {
        this.name = name;
    }

    public static FileType forFile(java.io.File file) {
        if (file.isDirectory()) {
            return DIRECTORY;
        }

        var fileName = file.getName();

        if (fileName.endsWith(".ass")) {
            return SUBTITLE;
        }

        if (fileName.endsWith(".mp3")) {
            return AUDIO;
        }

        return null;
    }

    @JsonValue
    public String getName() {
        return name;
    }
}