 
USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `sp_getEmail`;

DELIMITER ;

DELIMITER $$
USE `EQUIPOS_CECYT16`$$
CREATE PROCEDURE `sp_getEmail` (
	in email  VARCHAR(100)
    )
BEGIN
	set @existe_usuario := (select exists (select * from USUARIOS where USUARIOS.email = email) );

    if @existe_equipo = 0 then
		select @existe_usuario as existe_usuario;
	else
		select @existe_usuario as existe_usuario;
		select * from USUARIOS where USUARIOS.email = email;
	end if;
END$$

DELIMITER ;


