package com.app.crud.controlador;

import com.app.crud.entidad.Estudiante;
import com.app.crud.servicio.EstudianteServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//  Controlador Rest
@RestController
public class EstudianteControlador {

    @Autowired
    private EstudianteServicio servicio;

    @GetMapping("/api/estudiantes")
    public List<Estudiante> obtenerTodos(){

        // Retorna la lista de estudiantes
        return servicio.obtenerTodos();
    }

    @GetMapping("/api/estudiantes/{id}")
    public Estudiante obtenerPorId(@PathVariable String id){

        // Retorna un solo estudiantes segun el ID
        return servicio.obtenerPorId(Long.parseLong(id));
    }

    @DeleteMapping("/api/estudiantes/{id}")
    public void borrar(@PathVariable String id){

        // Elimina un estudiante segun el ID
        servicio.borrar(Long.parseLong(id));
    }

    @PostMapping("/api/estudiantes")
    public void guardar(@RequestBody Estudiante estudiante){

        // Inserta o actualiza un estudiante
        servicio.guardar(estudiante);
    }
}
