USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `sp_updateUsuario`;

USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `EQUIPOS_CECYT16`.`sp_updateUsuario`;
;

DELIMITER $$
USE `EQUIPOS_CECYT16`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_updateUsuario`(
        in id        INT,
        in usuario   VARCHAR(50),
		in nombre    VARCHAR(50),
        in apellido  VARCHAR(50),
        in email     VARCHAR(100),
        in acceso    VARCHAR(2)
		)
BEGIN

    UPDATE USUARIOS SET USUARIOS.usuario=usuario, USUARIOS.nombre=nombre, USUARIOS.apellido=apellido, USUARIOS.email=email, USUARIOS.acceso=acceso WHERE USUARIOS.id_usuario=id;

END$$

DELIMITER ;
