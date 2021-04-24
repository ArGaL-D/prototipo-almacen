 
USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `sp_getUsuario`;

DELIMITER ;

DELIMITER $$
USE `EQUIPOS_CECYT16`$$
CREATE PROCEDURE `sp_getUsuario` (
	in user  VARCHAR(50)
    )
BEGIN
	set @existe_usuario := (select exists (select * from USUARIOS where USUARIOS.usuario = user) );

    if @existe_equipo = 0 then
		select @existe_usuario as existe_usuario;
	else
		select @existe_usuario as existe_usuario;
		select * from USUARIOS where USUARIOS.usuario = user;
	end if;
END$$

DELIMITER ;


