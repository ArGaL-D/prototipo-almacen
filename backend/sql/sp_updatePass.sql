USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `sp_updatePass`;

DELIMITER ;

DELIMITER $$
USE `EQUIPOS_CECYT16`$$
CREATE PROCEDURE `sp_updatePass` ( in newPass VARCHAR(100), in idUser INT )

BEGIN
        UPDATE USUARIOS SET USUARIOS.password=newPass WHERE USUARIOS.id_usuario=idUser;
END$$

DELIMITER ;




