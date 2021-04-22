 USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `sp_getEquipoHilo`;

DELIMITER ;

DELIMITER $$
USE `EQUIPOS_CECYT16`$$
CREATE PROCEDURE `sp_getEquipoHilo` (
    in serial VARCHAR(30)
    )
BEGIN

    select REPARACIONES.serial, EQUIPOS.equipo, REPARACIONES.hilo, DATE_FORMAT(REPARACIONES.fecha,"%d-%m-%Y") as fecha, TIME_FORMAT(REPARACIONES.fecha,"%r") as hora from EQUIPOS inner join REPARACIONES on REPARACIONES.serial=serial group by REPARACIONES.hilo;

END$$

DELIMITER ;



