import { useCallback, useMemo, useRef, useState } from 'react';
import useMainData from './useMainData.js';

import useAuth from './useAuth.js';
import useSubmitMail from './useSubmitMail.js';

const NAME_REGEX        = /^[A-Za-zÁáÉéÍíÓóÚúÑñÜü\s]+$/;
const PHONE_REGEX       = /^[0-9]{10}$/;
const MESSAGE_REGEX     = /^[A-Za-z0-9ÁáÉéÍíÓóÚúÑñÜü\s.,$!?-]{1,500}$/;
const VALIDATION_RESULT = {
    success: (value) => ({ 
        isValid: true, 
        message: '', 
        value 
    }),
    error: (message) => ({ 
        isValid: false, 
        message, 
        value: ''
    })
};

const useContactForm = () => {
    const { profile } = useAuth();
    const { globalInfo } = useMainData();
    const { sendMail } = useSubmitMail();

    const ARR_INFO_CARD_CONTENT = useMemo(() => [
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
    ], [globalInfo]);

    // Initial state based on profile (only for the first load)
    const getInitialState = useCallback(() => ({
        name        : profile?.full_name?.toUpperCase() || '',
        phone_number: profile?.number || '',
        message     : ''
    }), [profile]);

    const contactForm = useRef(null);

    const [ isSubmitting , setIsSubmitting   ] = useState(false);
    const [ submitStatus , setSubmitStatus   ] = useState(null); // 'success', 'error', null
    const [ formContent  , setFormContent    ] = useState(() => getInitialState());
    const [ fieldErrors  , setFieldErrors    ] = useState(() => getInitialState());

    // Control para no sobrescribir el formulario si el usuario ya escribió
    const [ hasLoadedProfile, setHasLoadedProfile ] = useState(false);
    
    // Recomendación de React: Ajustar estado en renderizado en lugar de useEffect para evitar renders en cascada
    if (profile && !hasLoadedProfile) {
        setHasLoadedProfile(true);
        const initialState = getInitialState();
        setFormContent(initialState);
        setFieldErrors(initialState);
    }

    // El contador de caracteres es un estado derivado, no necesita useState ni useEffect
    const count = formContent.message.length;

    const nameValidation = useCallback((name) => {
        const cleanedName = name.trim();
        if (!cleanedName)                   return VALIDATION_RESULT.error('El nombre es requerido.');
        if (!NAME_REGEX.test(cleanedName))  return VALIDATION_RESULT.error('El nombre solo puede contener letras y espacios.');
        return VALIDATION_RESULT.success(cleanedName.toUpperCase());
    }, []);

    const phoneNumberValidation = useCallback((phone) => {
        const cleanedPhoneNumber = phone.trim().replace(/\D/g, '');
        if (!cleanedPhoneNumber)                    return VALIDATION_RESULT.error('El número de teléfono es requerido.');
        if (!PHONE_REGEX.test(cleanedPhoneNumber))  return VALIDATION_RESULT.error('El número debe tener exactamente 10 dígitos.');
        return VALIDATION_RESULT.success(cleanedPhoneNumber);
    }, []);

    const messageValidation = useCallback((message) => {
        const cleanedMessage = message.trim();
        if (!cleanedMessage)                        return VALIDATION_RESULT.error('El mensaje es requerido.');
        if (!MESSAGE_REGEX.test(cleanedMessage))    return VALIDATION_RESULT.error('El mensaje contiene caracteres no permitidos.');
        return VALIDATION_RESULT.success(cleanedMessage);
    }, []);

    const VALIDATORS = useMemo(() => ({
        name        : nameValidation,
        phone_number: phoneNumberValidation,
        message     : messageValidation
    }), [nameValidation, phoneNumberValidation, messageValidation]);

    const setFormContentState = useCallback((e) => {
        const { id, value } = e.target;
        const upperValue    = value.toUpperCase();
        setFormContent((prev) => ({...prev, [id]: upperValue}));
        // Validate specific field while typing
        const result = VALIDATORS[id]?.(upperValue);
        if (result) setFieldErrors(prev => ({...prev, [id]: result.isValid ? '' : result.message}));
    }, [VALIDATORS]);

    const formHandler = useCallback(async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        // Current fields values
        const currentName       = formContent.name;
        const currentPhone      = formContent.phone_number;
        const currentMessage    = formContent.message;

        // Validate all fields
        const nameResult    = nameValidation(currentName);
        const phoneResult   = phoneNumberValidation(currentPhone);
        const messageResult = messageValidation(currentMessage);

        setFieldErrors({
            name        : nameResult.message,
            phone_number: phoneResult.message,
            message     : messageResult.message
        });
    
        if (!nameResult.isValid || !phoneResult.isValid || !messageResult.isValid) return setIsSubmitting(false);

        // Send the email with useSubmitMail hook
        const result = await sendMail('Nueva consulta desde la web', {
            Nombre  : nameResult.value,
            Numero  : phoneResult.value,
            WhatsApp: `https://wa.me/549${phoneResult.value}`,
            Mensaje : messageResult.value
        });

        if (result.success) {
            setSubmitStatus('success');
            // Reset form to initial state (without overwriting with profile if it has changed)
            const resetState = getInitialState();
            setFormContent(resetState);
            setFieldErrors(resetState);
            setTimeout(() => setSubmitStatus(null), 5000);
        } else {
            setSubmitStatus('error');
        }

        setIsSubmitting(false);
    }, [formContent, nameValidation, phoneNumberValidation, messageValidation, sendMail, getInitialState]);

    return {
        ARR_INFO_CARD_CONTENT,
        formContent,
        fieldErrors,
        count,
        isSubmitting,
        submitStatus,
        contactForm,
        setFormContentState,
        formHandler
    };
};
export default useContactForm;