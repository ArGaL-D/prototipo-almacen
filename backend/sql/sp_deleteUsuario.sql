USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `sp_deleteUsuario`;

DELIMITER ;

DELIMITER $$
USE `EQUIPOS_CECYT16`$$
CREATE PROCEDURE `sp_deleteUsuario`(in idUser INT)
BEGIN

        delete from USUARIOS where USUARIOS.id_usuario=idUser;

END$$

DELIMITER ;
