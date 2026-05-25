import { useMemo, useCallback } from 'react';
import useAuth from './useAuth';

const _MSG_BTN_FAILED = 'Se detectó un problema con este botón y actualmente no está funcionando. Estamos trabajando para resolverlo. Le pedimos disculpas por las molestias ocasionadas.';

const useSocialMedia = (globalInfo) => {
    const { profile } = useAuth();
    // Información de cada red social
    const arrSocialMedia = useMemo(() => [
        {
            name: 'facebook',
            icon: 'bi bi-facebook',
            color: 'primary',
            url: 'https://www.facebook.com/share/16FkGbSYi4/?mibextid=wwXIfr'
        },
        {
            name: 'whatsapp',
            icon: 'bi bi-whatsapp',
            color: 'success',
            url: `https://wa.me/${globalInfo.phoneNumber.replace(/\D/g, '')}?text=Hola,%20mi%20nombre%20es%20${encodeURIComponent(profile?.full_name || 'NOMBRE_AQUI')}.%20Quería%20consultar%20por%20${encodeURIComponent('MENSAJE_AQUI')}`
        }
    ], [profile, globalInfo]);

    // Handler para eventos de click
    const onClickHandler = useCallback((e) => {
        const socialMediaItem = arrSocialMedia.find(item => item.name === e.currentTarget.id);

        socialMediaItem?.url
            ? window.open(socialMediaItem.url, '_blank', 'noopener,noreferrer')
            : alert(_MSG_BTN_FAILED);
    }, [arrSocialMedia]);

    return {
        arrSocialMedia,
        onClickHandler
    };
};

export default useSocialMedia;