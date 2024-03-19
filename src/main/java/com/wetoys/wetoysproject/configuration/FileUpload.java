package com.wetoys.wetoysproject.configuration;

import com.wetoys.wetoysproject.entity.MemberFileEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
@Transactional
@RequiredArgsConstructor
public class FileUpload {

    public List<String> fileUpload(MultipartFile file) throws IOException {

        List<String> fileUpload = new ArrayList<>();

        String original = file.getOriginalFilename();
        String uuid = UUID.randomUUID().toString();
        uuid = uuid + "." + original;

        String filePath = "        C:/Users/정종두/IdeaProjects/WetoysProject/src/main/fronted/public/image";


        fileUpload.add(uuid); //저장될이름
        fileUpload.add(original); //원본
        fileUpload.add(filePath); // 이동경로

        try (
                FileOutputStream fos = new FileOutputStream("        C:/Users/정종두/IdeaProjects/WetoysProject/src/main/fronted/public/image" + uuid);
                InputStream is = file.getInputStream();
        ) {
            int readCount = 0;
            byte[] buffer = new byte[1024];
            while ((readCount = is.read(buffer)) != -1) {
                fos.write(buffer, 0, readCount);
            }
        } catch (Exception ex) {
            throw new RuntimeException("file Save Error");
        }

        return fileUpload;

    }


}
