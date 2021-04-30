USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `sp_deleteEquipo`;

USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `EQUIPOS_CECYT16`.`sp_deleteEquipo`;
;

DELIMITER $$
USE `EQUIPOS_CECYT16`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_deleteEquipo`(in serial VARCHAR(30))
BEGIN

        delete from EQUIPOS where EQUIPOS.num_serie=serial;
END$$

DELIMITER ;
