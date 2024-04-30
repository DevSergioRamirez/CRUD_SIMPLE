package com.app.crud.entidad;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//  Clase de estudiantes para una DB con una tabla
//  con id, nombre, apellido y email
@Entity
@Table(name="estudiantes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Estudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "nombre", nullable = false, length = 50)
    private String nombre;

    @Column(name = "apellido", nullable = false, length = 50)
    private String apellido;

    @Column(name = "email", nullable = false, length = 50, unique = true)
    private String email;
}
