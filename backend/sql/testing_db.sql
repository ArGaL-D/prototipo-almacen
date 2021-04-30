### Archivo de PRUEBAS ###

#SHOW EQUIPOS_CECYT16;

USE ALMACEN_EQUIPOS;

#CREATE DATABASE EQUIPOS_CECYT16;
/*
CREATE TABLE EQUIPOS(
    num_serie   VARCHAR(30) NOT NULL,
    equipo      VARCHAR(35) NOT NULL,
    marca       VARCHAR(35) NOT NULL,
    modelo      VARCHAR(35) NOT NULL,    
    estatus     VARCHAR(20) NOT NULL,
    descripcion TEXT,
    PRIMARY KEY(num_serie)
);

CREATE TABLE ALMACEN(
    serial   VARCHAR(30) NOT NULL,
    almacen  VARCHAR(30) NOT NULL,
    edificio TINYINT NOT NULL,
    piso     TINYINT NOT NULL,
    FOREIGN KEY(serial) REFERENCES EQUIPOS(num_serie) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE PRESTAMOS(
    nombre_persona    VARCHAR(50) NOT NULL,
    clave_boleta      VARCHAR(15) NOT NULL,
    serie_equipo      VARCHAR(30) NOT NULL,
    fecha_salida      DATE,
   FOREIGN KEY(serie_equipo) REFERENCES EQUIPOS(num_serie) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE UBICACIONES(
    edificio     TINYINT  NOT NULL,
    piso         TINYINT  NOT NULL,
    aula         SMALLINT NOT NULL,
    serie_equipo VARCHAR(30) NOT NULL,
    FOREIGN KEY(serie_equipo) REFERENCES EQUIPOS(num_serie) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE ENTREGAS(
    serie_equipo   VARCHAR(30) NOT NULL,
    nombre_persona VARCHAR(50) NOT NULL,
    fecha_entrega  DATE,
    FOREIGN KEY(serie_equipo) REFERENCES EQUIPOS(num_serie) 
);

CREATE TABLE USUARIOS(
    id_usuario  INT AUTO_INCREMENT NOT NULL,
    usuario     VARCHAR(50)  NOT NULL,
    nombre      VARCHAR(50)  NOT NULL,
    apellido    VARCHAR(50)  NOT NULL,
    email       VARCHAR(100) NOT NULL,
    password    VARCHAR(100) NOT NULL,
    acceso      CHAR(2)  NOT NULL,
    PRIMARY KEY(id_usuario)
);

CREATE TABLE REPARACIONES(
    serial   VARCHAR(30) NOT NULL,
    hilo     VARCHAR(10) NOT NULL,
    reporte  VARCHAR(50) NOT NULL,
    estatus  VARCHAR(20) NOT NULL,
    etapa    VARCHAR(40) NOT NULL,
    fecha    DATETIME,
    detalles TEXT,
    FOREIGN KEY(serial) REFERENCES EQUIPOS(num_serie) ON UPDATE CASCADE ON DELETE CASCADE
    
);

*/


#INSERT INTO USUARIO VALUES(1,"admin","Augurio","Hernández Chávez","auhernandezc@ipn.mx","$2b$10$dvl6WVR3wL7C7zwWQamGKueEc8/yK3d2KG/SgyG9.EV0NbnKJgcg6","admin","Si");
