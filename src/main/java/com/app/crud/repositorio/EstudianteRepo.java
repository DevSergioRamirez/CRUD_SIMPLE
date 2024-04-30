package com.app.crud.repositorio;

import com.app.crud.entidad.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//  Repositorio
@Repository
public interface EstudianteRepo extends JpaRepository<Estudiante, Long> {
}
