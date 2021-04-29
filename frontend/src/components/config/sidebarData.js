import * as FaIcons   from "react-icons/fa";
import * as AiIcons   from "react-icons/ai";
import * as ImIcons   from "react-icons/im";

export const routes = [
    {
        id   : 'home',
        path : "",
        exact: true,
        title: 'Home',
        icon :  <FaIcons.FaHome/>
    },
    {
        id   : 'buscar',
        path : "/buscar",
        title: 'Buscar',
        icon :  <FaIcons.FaSearch/>
    },
    {
        id   : 'registrar',
        path : "/registro",
        title: 'Registrar',
        icon :  <ImIcons.ImPencil/>
    },
    {
        id   : 'prestamo',
        path : "/prestamo",
        title: 'Préstamo',
        icon :  <AiIcons.AiOutlineLaptop/>
    },
    {
        id   : 'entrega',
        path : "/entrega",
        title: 'Entrega',
        icon :  <FaIcons.FaHandHolding/>
    },
    {
        id   : 'ubicacion',
        path : "/ubicacion",
        title: 'Ubicación-préstamos',
        icon :  <ImIcons.ImLocation/>
    },
    {
        id   : 'reparacion',
        path : "/reparacion",
        title: 'Reparación',
        icon :  <FaIcons.FaTools/>
    },
    {
        id   : 'usuarios',
        path : "/usuarios",
        title: 'Administrador',
        icon :  <FaIcons.FaUserCog/>
    }
];