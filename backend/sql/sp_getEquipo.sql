USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `sp_getEquipo`;

DELIMITER ;

DELIMITER $$
USE `EQUIPOS_CECYT16`$$
CREATE PROCEDURE `sp_getEquipo` ()
BEGIN
    select * from EQUIPOS inner join ALMACEN on EQUIPOS.num_serie=ALMACEN.serial;
END$$

DELIMITER ;

