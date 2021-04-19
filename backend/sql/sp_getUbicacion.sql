 
USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `sp_getUbicacion`;

USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `EQUIPOS_CECYT16`.`sp_getUbicacion`;
;

DELIMITER $$
USE `EQUIPOS_CECYT16`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getUbicacion`()
BEGIN
    # Saber la ubicación de los equipos prestados

    select EQUIPOS.equipo, EQUIPOS.num_serie, UBICACIONES.edificio, UBICACIONES.piso, UBICACIONES.aula, DATE_FORMAT(PRESTAMOS.fecha_salida,"%d-%m-%Y") as fecha_salida from EQUIPOS inner join UBICACIONES on EQUIPOS.num_serie=UBICACIONES.serie_equipo inner join PRESTAMOS on EQUIPOS.num_serie=PRESTAMOS.serie_equipo;
END$$

DELIMITER ;
;
