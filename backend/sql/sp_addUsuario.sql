USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `sp_addUsuario`;

DELIMITER ;

DELIMITER $$
USE `EQUIPOS_CECYT16`$$
CREATE PROCEDURE `sp_addUsuario` (
	in usuario     VARCHAR(100),
	in nombre      VARCHAR(50),
    in apellido    VARCHAR(50),
    in correo      VARCHAR(100),
    in password    VARCHAR(150),
	in acceso 	   CHAR(2)
    )
BEGIN
	set @existe_usuario := (select exists (select * from USUARIOS where USUARIOS.usuario=usuario) );
	set @existe_email := (select exists (select * from USUARIOS where USUARIOS.email=correo) );

    if @existe_usuario = 0 then
		if @existe_email = 0 then
			insert into USUARIOS 
				(USUARIOS.usuario,
				 USUARIOS.nombre,
				 USUARIOS.apellido,
				 USUARIOS.email,
				 USUARIOS.password,
				 USUARIOS.acceso)
		    values(usuario,nombre,apellido,correo,password,acceso);			
						
			select @existe_usuario as existe_usuario; #0
			select @existe_email as existe_email; #0
		else
			select @existe_usuario as existe_usuario; #0
			select @existe_email as existe_email; #1
		end if;
	else
		select @existe_usuario as existe_usuario; #1
	end if;
END$$

DELIMITER ;


