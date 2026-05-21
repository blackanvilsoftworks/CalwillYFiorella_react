import { useCallback, useMemo, useState } from 'react';
import useMainData from './useMainData.js';

import useAuth from './useAuth.js';
import useSubmitMail from './useSubmitMail.js';

const NAME_REGEX        = /^[A-Za-zÁáÉéÍíÓóÚúÑñÜü\s]+$/;
const PHONE_REGEX       = /^[0-9]{10}$/;
const MESSAGE_REGEX     = /^[A-Za-z0-9ÁáÉéÍíÓóÚúÑñÜü\s.,$!?-]{1,500}$/;
const VALIDATION_RESULT = {
    success: (value) => ({ 
        isValid: true, 
        value,
        message: ''
    }),
    error: (message) => ({ 
        isValid : false,
        value   : '',
        message
    })
};

const getFormData = (profile = null) => ({
    name        : profile?.full_name?.toUpperCase() || '',
    phone_number: profile?.phone || '',
    message     : ''
});

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

    const [ isSubmitting , setIsSubmitting   ] = useState(false);
    const [ submitStatus , setSubmitStatus   ] = useState(null); // 'success', 'error', null
    const [ formContent  , setFormContent    ] = useState(getFormData());
    const [ fieldErrors  , setFieldErrors    ] = useState(getFormData());

    // Reset form fields to user data from profile (only for the first load)
    const [hasLoadedProfile, setHasLoadedProfile] = useState(false);
    if (profile && !hasLoadedProfile) {
        setFormContent(prev => ({...prev, ...getFormData(profile)}));
        setHasLoadedProfile(true);
    }

    // Message character counter
    const count = useMemo(() => formContent?.message.length || 0, [formContent.message]);

    const nameValidation = useCallback((name) => {
        if (!name)                   return VALIDATION_RESULT.error('El nombre es requerido.');
        if (!NAME_REGEX.test(name))  return VALIDATION_RESULT.error('El nombre solo puede contener letras y espacios.');
        return VALIDATION_RESULT.success(name.toUpperCase());
    }, []);

    const phoneNumberValidation = useCallback((phone) => {
        const cleanedPhoneNumber = phone.replace(/\D/g, '');
        if (!cleanedPhoneNumber)                    return VALIDATION_RESULT.error('El número de teléfono es requerido.');
        if (!PHONE_REGEX.test(cleanedPhoneNumber))  return VALIDATION_RESULT.error('El número debe tener exactamente 10 dígitos.');
        return VALIDATION_RESULT.success(cleanedPhoneNumber);
    }, []);

    const messageValidation = useCallback((message) => {
        if (!message)                        return VALIDATION_RESULT.error('El mensaje es requerido.');
        if (!MESSAGE_REGEX.test(message))    return VALIDATION_RESULT.error('El mensaje contiene caracteres no permitidos.');
        return VALIDATION_RESULT.success(message);
    }, []);

    const VALIDATORS = useMemo(() => ({
        name        : nameValidation,
        phone_number: phoneNumberValidation,
        message     : messageValidation
    }), [nameValidation, phoneNumberValidation, messageValidation]);

    const _handleValidationResult = useCallback((id, value, result) => {
        if (result.isValid) {
            setFormContent(prev => ({...prev, [id]: result.value}));
            setFieldErrors(prev => ({...prev, [id]: ''}));
        } else {
            setFormContent(prev => ({...prev, [id]: value}));
            setFieldErrors(prev => ({...prev, [id]: result.message}));
        }
    }, []);

    const setContentFormState = useCallback((e) => {
        const { id, value } = e.target;
        const upperValue = value.toUpperCase();
        
        // Validate specific field while typing
        _handleValidationResult(id, upperValue, VALIDATORS[id]?.(upperValue));
    }, [VALIDATORS, _handleValidationResult]);
    
    const _validateAllFields = useCallback((values) => {
        console.log(`- values: ${JSON.stringify(values)}`);
        Object.entries(values).map(([key, value]) => {
            const validator = VALIDATORS[key]?.(value);
            console.log(`
                - key: ${key}
                - value: ${value}
                - validator: ${JSON.stringify(validator)}
            `);
            _handleValidationResult(key, value, validator);
        });
    }, [VALIDATORS, _handleValidationResult]);

    const onSubmitFormHandler = useCallback(async (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        setSubmitStatus(null);

        // Current fields values
        const currentName       = formContent.name.trim();
        const currentPhone      = formContent.phone_number.trim();
        const currentMessage    = formContent.message.trim();

        // Before sending, validate all fields
        _validateAllFields({
            name        : currentName,
            phone_number: currentPhone,
            message     : currentMessage
        });

        if (Object.values(fieldErrors).some(err => !err?.isValid)) {
            setIsSubmitting(false);
            return alert('Hay errores en el formulario.');
        }

        // Send the email with useSubmitMail hook
        const result = await sendMail('Nueva consulta desde la web', {
            Nombre  : currentName,
            Numero  : currentPhone,
            WhatsApp: `https://wa.me/549${currentPhone}`,
            Mensaje : currentMessage
        });
        
        if (result.success) {
            setSubmitStatus('success');
            // Reset form to initial state (without overwriting with profile if it has changed)
            setFormContent(getFormData());
            setFieldErrors(getFormData());
            setTimeout(() => setSubmitStatus(null), 5000);
        } else {
            setSubmitStatus('error');
        }

        setIsSubmitting(false);
    }, [formContent, sendMail, fieldErrors, _validateAllFields]);

    return {
        ARR_INFO_CARD_CONTENT,
        formContent,
        fieldErrors,
        count,
        isSubmitting,
        submitStatus,
        setContentFormState,
        onSubmitFormHandler
    };
};
export default useContactForm;