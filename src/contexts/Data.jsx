import { createContext } from "react";

const DataContext = createContext();

const DataContextProvider = ({ children }) => {

    const globalInfo = {
        name        : 'Calwill & Fiorella',
        phoneNumber : '+54 9 11-5959-0586',
        email       : 'calwillyfiorella@gmail.com',
        web         : 'https://calwillyfiorella.com'
    };
    
    const imagesPath = '/assets/images/';

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
            url     : `https://wa.me/${globalInfo.phoneNumber.replace(/\D/g, '')}` // Quita todo lo que no sea número y que busque el array por tipo y no por index
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