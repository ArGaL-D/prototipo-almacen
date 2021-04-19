 USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `sp_getEquipoHilo`;

DELIMITER ;

DELIMITER $$
USE `EQUIPOS_CECYT16`$$
CREATE PROCEDURE `sp_getEquipoHilo` (
    in serial VARCHAR(30)
    )
BEGIN

    select EQUIPOS.num_serie, EQUIPOS.equipo, REPARACIONES.hilo, DATE_FORMAT(REPARACIONES.fecha,"%d-%m-%Y") as fecha, TIME_FORMAT(REPARACIONES.fecha,"%r") as hora from EQUIPOS inner join REPARACIONES on EQUIPOS.num_serie=serial group by REPARACIONES.hilo;

END$$

DELIMITER ;



