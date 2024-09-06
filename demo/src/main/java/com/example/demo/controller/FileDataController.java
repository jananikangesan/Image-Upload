package com.example.demo.controller;

import com.example.demo.model.FileData;
import com.example.demo.service.StrogeService;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/image")
public class FileDataController {

  @Autowired
  private StrogeService strogeService;


  @PostMapping("/fileSystem")
  public ResponseEntity<?> uploadImageToFileSystem(@RequestParam("image")MultipartFile file)throws IOException{
    String uploadImage=strogeService.uploadImageToFileSystem(file);
    return ResponseEntity.status(HttpStatus.OK)
        .body(uploadImage);
  }

//  @GetMapping("/downloadFile/{fileName}")
//  public ResponseEntity<?> downloadImageFromFileSystem(@PathVariable String fileName) throws IOException{
//    byte[] imageData= strogeService.downloadImageFromFileSystem(fileName);
//    return ResponseEntity.status(HttpStatus.OK)
//        .contentType(MediaType.valueOf("image/png"))
//        .body(imageData);
//  }

  @GetMapping("/downloadFile/{fileName}")
  public ResponseEntity<byte[]> downloadImageFromFileSystem(@PathVariable String fileName) throws IOException {
    byte[] imageData = strogeService.downloadImageFromFileSystem(fileName);

    // Determine the content type based on the file extension
    String contentType = Files.probeContentType(new File(fileName).toPath());
    if (contentType == null) {
      contentType = "application/octet-stream";  // Fallback content type
    }

    return ResponseEntity.ok()
        .contentType(MediaType.parseMediaType(contentType))
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
        .body(imageData);
  }

  @GetMapping("/showAll")
  public List<FileData> getProducts(){
    System.out.println("+++++++++++++++++++"+strogeService.getAllProduct());
    return strogeService.getAllProduct();
  }

}
