USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `sp_getSeguimiento`;

DELIMITER ;

DELIMITER $$
USE `EQUIPOS_CECYT16`$$
CREATE PROCEDURE `sp_getSeguimiento` (
    in clave VARCHAR(10)
    )
BEGIN

    select REPARACIONES.serial, EQUIPOS.equipo, REPARACIONES.hilo, REPARACIONES.reporte, REPARACIONES.detalles, REPARACIONES.estatus, REPARACIONES.etapa, DATE_FORMAT(REPARACIONES.fecha,"%d-%m-%Y") as fecha, TIME_FORMAT(REPARACIONES.fecha,"%r") as hora from EQUIPOS inner join REPARACIONES on EQUIPOS.num_serie=REPARACIONES.serial where REPARACIONES.hilo=clave;
END$$

DELIMITER ;



