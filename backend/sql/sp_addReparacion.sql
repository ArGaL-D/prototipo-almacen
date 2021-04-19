USE `EQUIPOS_CECYT16`;
DROP procedure IF EXISTS `sp_addReparacion`;

DELIMITER ;

DELIMITER $$
USE `EQUIPOS_CECYT16`$$
CREATE PROCEDURE `sp_addReparacion` (
    in serial    VARCHAR(30),
    in hilo      VARCHAR(10),
    in reporte   VARCHAR(60),
    in status    VARCHAR(20),
    in etapa     VARCHAR(40),
    in fechaHora DATETIME,
    in detalles  TEXT
    )
BEGIN
    set @existe_equipo := (select exists (select * from EQUIPOS where EQUIPOS.num_serie=serial) );

    if @existe_equipo = 1 then
        update EQUIPOS set EQUIPOS.estatus=status where EQUIPOS.num_serie=serial;
        insert into REPARACIONES values(serial,hilo,reporte,status,etapa, fechaHora,detalles);
        select @existe_equipo as existe_equipo;
    else
        select @existe_equipo as existe_equipo;
    end if;
END$$

DELIMITER ;

