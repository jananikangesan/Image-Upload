package com.example.demo.Repository;

import com.example.demo.model.FileData;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileDataRepository extends JpaRepository<FileData,Long> {

   Optional<FileData> findByName(String name);
}
