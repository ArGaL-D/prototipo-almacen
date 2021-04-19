### Archivo de PRUEBAS ###

#SHOW DATABASES;

USE ALMACEN_EQUIPOS;

#CREATE DATABASE ALMACEN_EQUIPOS;
/*
CREATE TABLE EQUIPO(
    num_serie   VARCHAR(20) NOT NULL,
    marca       VARCHAR(30) NOT NULL,
    modelo      VARCHAR(30) NOT NULL,
    nombre      VARCHAR(30) NOT NULL,
    estado      VARCHAR(20) NOT NULL,
    descripcion TEXT,
    PRIMARY KEY(num_serie)
);

CREATE TABLE PRESTAMO_EQUIPO(
    num_prestamo      INT NOT NULL,
    nombre_persona    VARCHAR(50) NOT NULL,
    clave_boleta      VARCHAR(10) NOT NULL,
    serie_equipo      VARCHAR(20) NOT NULL,
    fecha_salida      DATE,
    PRIMARY KEY(num_prestamo),
    FOREIGN KEY(serie_equipo) REFERENCES EQUIPO(num_serie);
);

CREATE TABLE UBICACION_EQUIPO(
    edificio     TINYINT NOT NULL,
    piso         TINYINT NOT NULL,
    aula         TINYINT NOT NULL,
    serie_equipo VARCHAR(29) NOT NULL,
    FOREIGN kEY(serie_equipo) REFERENCES EQUIPO(num_serie)
);

CREATE TABLE ENTREGA_EQUIPO(
    serie_equipo   VARCHAR(20) NOT NULL,
    nombre_equipo  VARCHAR(30) NOT NULL,
    nombre_persona VARCHAR(50) NOT NULL,
    fecha_entrega  DATE,
    FOREIGN KEY(serie_equipo) REFERENCES EQUIPO(num_serie);
);

CREATE TABLE USUARIO(
    id_usuario  INT AUTO_INCREMENT NOT NULL,
    nombre      VARCHAR(50)  NOT NULL,
    apellido    VARCHAR(50)  NOT NULL,
    email       VARCHAR(100) NOT NULL,
    tipo_acceso VARCHAR(30)  NOT NULL,
    password    VARCHAR(150) NOT NULL,
    PRIMARY KEY(id_usuario)
);

/*
CREATE TABLE ADMINISTRADOR(
    id_admin    INT NOT NULL,
    id_usuario  INT NOT NULL,
    PRIMARY KEY(id_admin),
    FOREIGN KEY(id_usuario) REFERENCES USUARIO(id_usuario)
);

*/


#INSERT INTO USUARIO VALUES(1,"Augurio","Hernández Chávez","auhernandezc@ipn.mx","administrador","admin");
INSERT INTO USUARIO VALUES(2,"admin","admin","admin@admin.mx","administrador","admin");
#INSERT INTO ADMINISTRADOR VALUES(1,1);



#DELETE FROM USUARIO WHERE id_usuario=1;
#DELETE FROM USUARIO WHERE id_usuario=2;

UPDATE USUARIO SET nombre="Augurio" WHERE id_usuario=1;

SELECT * FROM USUARIO;
#SELECT * FROM ADMINISTRADOR;