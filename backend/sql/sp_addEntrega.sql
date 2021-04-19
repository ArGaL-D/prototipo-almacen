USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `sp_addEntrega`;

USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `EQUIPOS_CECYT16`.`sp_addEntrega`;
;

DELIMITER $$
USE `EQUIPOS_CECYT16`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_addEntrega`(
		in serial   VARCHAR(25),
        in nombre_persona  VARCHAR(50),
        in fecha	       DATE
		)
BEGIN
	set @existe_equipo := (select exists (select * from EQUIPOS where EQUIPOS.num_serie=serial) );
    set @check_status  := (select estatus from EQUIPOS where EQUIPOS.num_serie=serial);
    set @equipo_entregado := 0;

    if @existe_equipo = 1 then # 1, exise el equipo
		if @check_status = 'PRESTADO' then
		    insert into ENTREGAS values(serial, nombre_persona, fecha);
            update EQUIPOS set EQUIPOS.estatus="DISPONIBLE" where EQUIPOS.num_serie=serial;
            delete from UBICACIONES where UBICACIONES.serie_equipo=serial;
            delete from PRESTAMOS where PRESTAMOS.serie_equipo=serial;

            select @equipo_entregado := 1 as equipo_entregado;
		else
			select @equipo_entregado as equipo_entregado; # equipo no registrado
		end if;
	else
		select @existe_equipo as existe_equipo; # 0, no existe el equipo
	end if;

END$$

DELIMITER ;
