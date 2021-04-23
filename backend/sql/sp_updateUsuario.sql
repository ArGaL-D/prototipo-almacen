USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `sp_updateEquipo`;

USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `EQUIPOS_CECYT16`.`sp_updateEquipo`;
;

DELIMITER $$
USE `EQUIPOS_CECYT16`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_updateEquipo`(
        in serial_editado VARCHAR(30),
		in serial   VARCHAR(30),
        in equipo   VARCHAR(50),
        in marca    VARCHAR(50),
        in modelo   VARCHAR(50),
        in status   VARCHAR(20),
        in descripcion TEXT,
        in almacen  VARCHAR(30),
        in edificio TINYINT,
        in piso     TINYINT
		)
BEGIN

    UPDATE ALMACEN SET ALMACEN.almacen=almacen, ALMACEN.edificio=edificio, ALMACEN.piso=piso WHERE ALMACEN.serial=serial;

    UPDATE EQUIPOS set EQUIPOS.num_serie=serial_editado, EQUIPOS.equipo=equipo, EQUIPOS.marca=marca, EQUIPOS.modelo=modelo, EQUIPOS.estatus=status, EQUIPOS.descripcion=descripcion  where EQUIPOS.num_serie=serial;

    # AGREGAR UNA  SALIDA -> SELECT DE CONFIRMACIón

END$$

DELIMITER ;
