package com.app.crud.servicio;

import com.app.crud.entidad.Estudiante;
import com.app.crud.repositorio.EstudianteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//  Servicio o logica de negocio
@Service
public class EstudianteServicioImpl implements EstudianteServicio{

    @Autowired
    private EstudianteRepo repo;

    @Override
    public List<Estudiante> obtenerTodos(){
        return repo.findAll();
    }

    @Override
    public Estudiante obtenerPorId(Long id) {
        return repo.findById(id).get();
    }

    @Override
    public void borrar(Long id) {
        repo.deleteById(id);
    }

    @Override
    public void guardar(Estudiante estudiante) {
        repo.save(estudiante);
    }

}
