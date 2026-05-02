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

    const msjBotitasGeneral = 'Sandalias Franciscanas hechas de goma eva que le aportan suavidad, ligereza y flexibilidad. Ideal para los más chicos, ya que acompaña el movimiento de sus pies.';

    const arrProducts = [
        {
            id      : 'children', 
            title   : 'Calzado Infantil',
            cards   : [
                {
                    product         : 'Art. 103 (para niño)',
                    description     : msjBotitasGeneral,
                    features        : [],
                    price           : 15000,
                    images          : [1, 2, 3, 4, 5]
                },
                {
                    product         : 'Art. 105 (para niña)',
                    description     : msjBotitasGeneral,
                    features        : [],
                    price           : 15000,
                    images          : [1, 2, 3, 4, 5]
                },
                {
                    product         : 'Art. 107 (para niña)',
                    description     : msjBotitasGeneral,
                    features        : [],
                    price           : 15000,
                    images          : [1]
                },
                {
                    product         : 'Guillermina - Art. 114 (para niña)',
                    description     : 'Zapatito infantil estilo Guillermina. Confeccionado en cuero sintético, presenta un detalle de bordado de flores. Su base de goma eva lo hace liviano y flexible. Es un diseño clásico, prolijo y cómodo.',
                    features        : [
                        'Material: cuero sintético',
                        'Base de goma EVA (liviana y flexible)',
                        'Bordado de flores',
                        'Costura reforzada en el borde',
                        'Etiqueta de marca',
                        'Diseño clásico y versátil'
                    ],
                    price           : 15000,
                    images          : [1, 2, 3]
                },
                {
                    product         : 'Botitas de Pana - Art. 122 (para niña)',
                    description     : 'Botitas infantiles confeccionadas en pana, con interior de corderito que aporta abrigo y suavidad. Está diseñado con acolchado en el tobillo para mayor comodidad. La base de goma eva brinda ligereza y flexibilidad, ideal para el uso diario.',
                    features        : [
                        'Exterior de pana',
                        'Forro interno de corderito',
                        'Base de goma EVA (liviana y flexible)',
                        'Acolchado en el tobillo',
                        'Ojalillos y cordones',
                        'Costura en el borde',
                        'Etiqueta de marca',
                        'Abrigadas y cómodas'
                    ],
                    price           : 15000,
                    images          : [1, 2, 3, 4]
                },
                {
                    product         : 'Botitas con Velcro - Art. 123 (para niña)',
                    description     : 'Botitas infantiles de pana con interior de corderito. Su apertura con velcro facilita el calce. La base de goma eva brinda ligereza y flexibilidad, ideal para el uso diario.',
                    features        : [
                        'Exterior de pana',
                        'Forro de corderito',
                        'Base de goma EVA (liviana y flexible)',
                        'Cierre con velcro (fácil de poner y sacar)',
                        'Detalle de corazón',
                        'Costura en el borde',
                        'Etiqueta de marca',
                        'Diseño simple y funcional'
                    ],
                    price           : 15000,
                    images          : [1, 2]
                }
            ]
        }
        // ,
        // {
        //     id      : 'women',
        //     title   : 'Calzado para Mujeres',
        //     cards   : [
        //         {
        //             product         : 'Zapatos para Mujer',
        //             description     : 'Zapatos cómodos y resistentes para los más pequeños, disponibles en varios colores.',
        //             price           : 15000,
        //             images          : [1, 2, 3]
        //         },
        //         {
        //             product         : 'Zapatos para Mujer',
        //             description     : 'Bonitos y cómodos zapatos para niñas, perfectos para ocasiones especiales y uso diario.',
        //             price           : 15000,
        //             images          : [1, 2, 3]
        //         },
        //         {
        //             product         : 'Zapatos para Mujer',
        //             description     : 'Suaves y flexibles zapatos para bebés, diseñados para no molestar sus pies en desarrollo.',
        //             price           : 15000,
        //             images          : [1, 2, 3]
        //         },
        //         {
        //             product         : 'Zapatos para Mujer',
        //             description     : 'Bonitos y cómodos zapatos para niñas, perfectos para ocasiones especiales y uso diario.',
        //             price           : 15000,
        //             images          : [1, 2, 3]
        //         }
        //     ]
        // },
        // {
        //     id      : 'men',
        //     title   : 'Calzado para Hombres',
        //     cards   : [
        //         {
        //             product         : 'Zapatos para Hombres',
        //             description     : 'Zapatos cómodos y resistentes para los más pequeños, disponibles en varios colores.',
        //             price           : 15000,
        //             images          : [1, 2, 3]
        //         },
        //         {
        //             product         : 'Zapatos para Hombres',
        //             description     : 'Bonitos y cómodos zapatos para niñas, perfectos para ocasiones especiales y uso diario.',
        //             price           : 15000,
        //             images          : [1, 2, 3]
        //         },
        //         {
        //             product         : 'Zapatos para Hombres',
        //             description     : 'Suaves y flexibles zapatos para bebés, diseñados para no molestar sus pies en desarrollo.',
        //             price           : 15000,
        //             images          : [1, 2, 3]
        //         },
        //         {
        //             product         : 'Zapatos para Hombres',
        //             description     : 'Bonitos y cómodos zapatos para niñas, perfectos para ocasiones especiales y uso diario.',
        //             price           : 15000,
        //             images          : [1, 2, 3]
        //         }
        //     ]
        // }
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