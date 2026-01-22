import { createContext } from "react";

const DataContext = createContext();

const DataContextProvider = ({ children }) => {

    const globalInfo = {
        name        : 'calwill & fiorella',
        phoneNumber : '+54 9 11-5959-0586',
        email       : 'calwillyfiorella@gmail.com',
        web         : 'https://calwillyfiorella.com'
    };
    
    const imagesPath = '/assets/images/';
    
    const nameRegex          = /^[A-Za-z\s]+$/;
    const phoneNumberRegex   = /^[0-9]{10}$/;
    const messageRegex       = /^[A-Za-z0-9\-\s]/g; // todo Que esto valide que no se metan símbolos extraños. Que se puedan poner , y .
    
    const objContainers = {
        menu: {
            id          : 'navbar_container',
            className   : 'navbar navbar-expand-md navbar-light m-0 p-0 fixed-top shadow',
            navbar      : '',
            title       : '',
            icon        : '',
        },
        hero: {
            id          : 'hero_container',
            className   : 'hero px-3',
            navbar      : 'Inicio',
            title       : '',
            icon        : '',
        },
        about: {
            id          : 'about_us_container',
            className   : 'about_us_container container mt-3 mt-sm-5 pt-5 pb-3 text-center rounded-3',
            navbar      : 'Sobre Nosotros',
            title       : 'Sobre Nosotros',
            icon        : 'bi bi-balloon-heart',
        },
        features: {
            id          : 'features_container',
            className   : 'container mt-2 mt-sm-4 py-5',
            navbar      : 'Características',
            title       : '¿Por Qué Elegirnos?',
            icon        : 'bi bi-person-raised-hand',
        },
        products: {
            id          : 'products_container',
            className   : 'products_container container py-3 py-sm-4 py-md-5 rounded-3',
            navbar      : 'Productos',
            title       : 'Nuestros Productos',
            icon        : 'bi bi-cart',
        },
        shipping: {
            id          : 'shipping_container',
            className   : 'container pt-5 text-center',
            navbar      : 'Envíos',
            title       : 'Opciones de Envío',
            icon        : 'bi bi-rocket-takeoff',
        },
        payment: {
            id          : 'pay_methods_container',
            className   : 'pay_methods_container container text-center',
            navbar      : 'Pagos',
            title       : 'Métodos de Pago',
            icon        : 'bi bi-cash-coin',
        },
        contact: {
            id          : 'contact_form_container',
            className   : 'contact_form_container container pt-5 rounded-3',
            navbar      : 'Contacto',
            title       : 'Contáctanos',
            icon        : 'bi bi-mailbox-flag',
        },
        footer: {
            id          : 'footer_container',
            className   : 'text-center pt-4 mt-3',
            navbar      : '',
            title       : '',
            icon        : '',
        }
    };
    
    const arrProducts = [
        {
            id      : 'children',
            title   : 'Calzado Infantil',
            cards   : [
                {
                    product         : 'Franciscana para Niña Art. 105',
                    description     : 'Zapatos cómodos y resistentes para los más pequeños, disponibles en varios colores.',
                    price           : 15000,
                    images          : [1, 2, 3]
                },
                {
                    product         : 'Zapatos para Niña',
                    description     : 'Bonitos y cómodos zapatos para niñas, perfectos para ocasiones especiales y uso diario.',
                    price           : 15000,
                    images          : [1, 2, 3]
                },
                {
                    product         : 'Zapatos para Bebé',
                    description     : 'Suaves y flexibles zapatos para bebés, diseñados para no molestar sus pies en desarrollo.',
                    price           : 15000,
                    images          : [1, 2, 3]
                },
                {
                    product         : 'Zapatos para Niño',
                    description     : 'Bonitos y cómodos zapatos para niñas, perfectos para ocasiones especiales y uso diario.',
                    price           : 15000,
                    images          : [1, 2, 3]
                }
            ]
        },
        {
            id      : 'women',
            title   : 'Calzado para Mujeres',
            cards   : [
                {
                    product         : 'Zapatos para Mujer',
                    description     : 'Zapatos cómodos y resistentes para los más pequeños, disponibles en varios colores.',
                    price           : 15000,
                    images          : [1, 2, 3]
                },
                {
                    product         : 'Zapatos para Mujer',
                    description     : 'Bonitos y cómodos zapatos para niñas, perfectos para ocasiones especiales y uso diario.',
                    price           : 15000,
                    images          : [1, 2, 3]
                },
                {
                    product         : 'Zapatos para Mujer',
                    description     : 'Suaves y flexibles zapatos para bebés, diseñados para no molestar sus pies en desarrollo.',
                    price           : 15000,
                    images          : [1, 2, 3]
                },
                {
                    product         : 'Zapatos para Mujer',
                    description     : 'Bonitos y cómodos zapatos para niñas, perfectos para ocasiones especiales y uso diario.',
                    price           : 15000,
                    images          : [1, 2, 3]
                }
            ]
        },
        {
            id      : 'men',
            title   : 'Calzado para Hombres',
            cards   : [
                {
                    product         : 'Zapatos para Hombres',
                    description     : 'Zapatos cómodos y resistentes para los más pequeños, disponibles en varios colores.',
                    price           : 15000,
                    images          : [1, 2, 3]
                },
                {
                    product         : 'Zapatos para Hombres',
                    description     : 'Bonitos y cómodos zapatos para niñas, perfectos para ocasiones especiales y uso diario.',
                    price           : 15000,
                    images          : [1, 2, 3]
                },
                {
                    product         : 'Zapatos para Hombres',
                    description     : 'Suaves y flexibles zapatos para bebés, diseñados para no molestar sus pies en desarrollo.',
                    price           : 15000,
                    images          : [1, 2, 3]
                },
                {
                    product         : 'Zapatos para Hombres',
                    description     : 'Bonitos y cómodos zapatos para niñas, perfectos para ocasiones especiales y uso diario.',
                    price           : 15000,
                    images          : [1, 2, 3]
                }
            ]
        }
    ];
    
    const arrFeatures = [
        {
            icon        : 'bi bi-star-fill',
            title       : 'Calidad Premium',
            description : 'Utilizamos materiales de primera calidad para garantizar la durabilidad y comodidad de nuestro calzado.'
        },
        {
            icon        : 'bi bi-tree-fill',
            title       : 'Materiales Sustentables',
            description : 'Nos preocupamos por el medio ambiente utilizando materiales ecológicos y procesos sostenibles.'
        },
        {
            icon        : 'bi bi-heart-fill',
            title       : 'Hecho con Amor',
            description : 'Cada par de zapatos es fabricado con dedicación y atención a los detalles.'
        }
    ];
    
    const arrInfoCardContent = [
        {
            type    : 'Email',
            value   : globalInfo.email,
            icon    : 'bi bi-envelope-fill'
        },
        {
            type    : 'Teléfono',
            value   : globalInfo.phoneNumber,
            icon    : 'bi bi-telephone-fill'
        },
        {
            type    : 'Horario',
            value   : 'Lunes a Sábado de 09:00 a 18:00',
            icon    : 'bi bi-clock-fill'
        }
    ];
    
    const arrSocialMedia = [
        {
            name    : 'facebook',
            icon    : 'bi bi-facebook',
            color   : 'primary',
            url     : 'https://www.facebook.com/share/16FkGbSYi4/?mibextid=wwXIfr'
        },
        {
            name    : 'whatsapp',
            icon    : 'bi bi-whatsapp',
            color   : 'success',
            url     : `https://wa.me/${globalInfo.phoneNumber.replace(/\D/g, '')}` // Quita todo lo que no sea número y que busque el array por tipo y no porindex
        }
    ];
    
    const objDeliveryOptions = {
        collect_in_store: {
            subtitle    : 'Retiros en Estación Llavallol',
            description : [
                'En caso que deseen retirarlo, se realiza la entrega de manera gratuita en el hall de la estación de tren de Llavallol, coordinando día y horario por WhatsApp.'
            ]
        },
        delivery_gba: {
            subtitle    : 'Envíos en GBA',
            description : [
                'Envío mediante repartidor con un costo adicional. El costo depende de la zona.',
                'En caso de seleccionar envío, se deberá abonar el mismo en su totalidad por transeferencia a Mercado Pago el mismo día a modo de anticipo, previo a la salida del repartidor.'
            ]
        },
        delivery_country: {
            subtitle    : 'Envíos al Resto del País',
            description : [
                'Envío mediante Correo Argentino.',
                'Envío mediante OCA.',
                'Envío mediante Andreani.',
                'Envío mediante otras empresas de logística.'
            ]
        },
        shipping_policies:{
            subtitle    : 'Políticas de Envío',
            description : [
                'Se coordinará día y horario vía WhatsApp, una vez esté el repartidor en el lugar y hora acordado, se tendrá una tolerancia de 15 minutos.',
                'En caso de sobrepasar el tiemo de tolerancia, el pago no es reembolsable, y el repartidor coninuará con el resto de entregas, debiendose pactar una nueva fecha y horario.',
                'Dependiendo de la demanda, podría coordinarse para ese mismo día. En cualquier caso, se deberá abonar una nueva cuota de envío.'
            ]
        }
    };
    
    const arrPayMethods = [
        'Transferencia bancaria a cuenta de Mercado Pago',
        'Efectivo (10% de descuento)'
    ];

    const value = { 
        globalInfo, 
        imagesPath, 
        nameRegex, 
        phoneNumberRegex, 
        messageRegex, 
        objContainers, 
        arrProducts, 
        arrFeatures, 
        arrInfoCardContent, 
        arrSocialMedia, 
        objDeliveryOptions,
        arrPayMethods 
    };

    return (
        <DataContext.Provider value={value}>
            { children }
        </DataContext.Provider>
    );
};

export { DataContext, DataContextProvider };