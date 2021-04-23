USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `sp_getUsuarios`;

DELIMITER ;

DELIMITER $$
USE `EQUIPOS_CECYT16`$$
CREATE PROCEDURE `sp_getUsuarios` ()
BEGIN
    select id_usuario,usuario,nombre,apellido,email,acceso from USUARIOS;
END$$

DELIMITER ;
