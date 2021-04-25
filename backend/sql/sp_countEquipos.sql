USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `sp_countEquipos`;

DELIMITER ;

DELIMITER $$
USE `EQUIPOS_CECYT16`$$
CREATE PROCEDURE `sp_countEquipos` ()
BEGIN
    select count(*) as equipos_disponibles from EQUIPOS where estatus='DISPONIBLE';
    select count(*) as equipos_prestados from EQUIPOS where estatus='PRESTADO';
    select count(*) as equipos_reparacion from EQUIPOS where estatus='REPARACIÓN';
END$$

DELIMITER ;

