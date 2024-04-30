package com.app.crud.servicio;

import com.app.crud.entidad.Estudiante;

import java.util.List;

public interface EstudianteServicio {

    List<Estudiante> obtenerTodos();

    Estudiante obtenerPorId(Long id);

    void borrar(Long id);

    void guardar(Estudiante estudiante);


}
