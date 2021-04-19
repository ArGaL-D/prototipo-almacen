USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `sp_addPrestamo`;

USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `EQUIPOS_CECYT16`.`sp_addPrestamo`;
;

DELIMITER $$
USE `EQUIPOS_CECYT16`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_addPrestamo`(
    in nombre_persona 	varchar(50),
    in clave_boleta 	varchar(15),
    in serie_equipo	    varchar(30),
    in fecha 		    date,
    in edificio         tinyint,
    in piso             tinyint,
    in aula             smallint
    )
BEGIN
    set @existe_equipo := (select exists (select * from EQUIPOS where EQUIPOS.num_serie=serie_equipo) );
    set @status_equipo := (select estatus from EQUIPOS where EQUIPOS.num_serie=serie_equipo);
    set @disponibilidad_equipo = 1;
    
    /*Verificar el serial(equipo) en la tabla 'EQUIPO' existe*/
    if @existe_equipo = 1  then
	 if @status_equipo = 'DISPONIBLE' then
	     insert into PRESTAMOS  values(nombre_persona, clave_boleta, serie_equipo, fecha);
	     insert into UBICACIONES values(edificio, piso, aula, serie_equipo);
	     update EQUIPOS set estatus="PRESTADO" where EQUIPOS.num_serie=serie_equipo;
	     select @disponibilidad_equipo as equipo_disponible;
	 else
	     select @disponibilidad_equipo := 0 as equipo_disponible;
	 end if;
    else
	 select @existe_equipo as existe_equipo;
    end if;	
END$$

DELIMITER ;
;
