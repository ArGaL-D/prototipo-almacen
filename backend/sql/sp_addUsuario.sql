USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `sp_addUsuario`;

DELIMITER ;

DELIMITER $$
USE `EQUIPOS_CECYT16`$$
CREATE PROCEDURE `sp_addUsuario` (
	in serial          VARCHAR(30),
	in equipo      	   VARCHAR(50),
    in marca           VARCHAR(30),
    in modelo          VARCHAR(30),
    in estatus         VARCHAR(20),
	in descripcion 	   TEXT,
	in almacen         VARCHAR(30),
	in edificio        TINYINT,
	in piso            TINYINT
    )
BEGIN
	set @existe_equipo := (select exists (select * from EQUIPOS where EQUIPOS.num_serie=serial) );

    if @existe_equipo = 0 then
		insert into EQUIPOS values(serial, equipo, marca, modelo, estatus, descripcion);
		insert into ALMACEN values(serial, almacen, edificio, piso);
		select @existe_equipo as existe_equipo;
	else
		select @existe_equipo as existe_equipo;
	end if;
END$$

DELIMITER ;


