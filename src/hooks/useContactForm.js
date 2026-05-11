import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useMainData from '../../hooks/useMainData.js';

import useAuth from '../../hooks/useAuth.js';

const useContactForm = () => {
    const { profile } = useAuth();
    const { globalInfo } = useMainData();

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

    const INITIAL_STATE = useMemo(() => ({
        name        : profile?.full_name.toUpperCase() || '',
        phone_number: profile?.number || '',
        message     : ''
    }), [profile]);

    const contactForm = useRef(null);

    const [ count        , setCount          ] = useState(0);
    const [ isSubmitting , setIsSubmitting   ] = useState(false);
    const [ submitStatus , setSubmitStatus   ] = useState(null); // 'success', 'error', null
    const [ formContent  , setFormContent    ] = useState(INITIAL_STATE);
    const [ fieldErrors  , setFieldErrors    ] = useState(INITIAL_STATE);

    const setFormContentState = useCallback((e) => {
        const { id, value } = e.target;
        const upperValue    = value.toUpperCase();
        setFormContent((prevState) => ({
            ...prevState,
            [id]: upperValue
        }));
        // Validar campo al escribir
        validateField(id, upperValue);
    }, [validateField]);

    // Validaciones
    const validationResult = useMemo(() => ({
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
    }), []);

    const nameValidation = useCallback((name) => {
        const cleanedName = name.trim();
        if (!cleanedName)                                       return validationResult.error('El nombre es requerido.');
        if (!/^[A-Za-zÁáÉéÍíÓóÚúÑñÜü\s]+$/.test(cleanedName))   return validationResult.error('El nombre solo puede contener letras y espacios.');
        return validationResult.success(cleanedName.toUpperCase());
    }, [validationResult]);

    const phoneNumberValidation = useCallback((phone) => {
        const cleanedPhoneNumber = phone.trim().replace(/\D/g, '');
        if (!cleanedPhoneNumber)                        return validationResult.error('El número de teléfono es requerido.');
        if (!/^[0-9]{10}$/.test(cleanedPhoneNumber))    return validationResult.error('El número debe tener exactamente 10 dígitos.');
        return validationResult.success(cleanedPhoneNumber);
    }, [validationResult]);

    const messageValidation = useCallback((message) => {
        const cleanedMessage = message.trim();
        if (!cleanedMessage)                                                    return validationResult.error('El mensaje es requerido.');
        if (!/^[A-Za-z0-9ÁáÉéÍíÓóÚúÑñÜü\s.,$!?-]{1,500}$/.test(cleanedMessage)) return validationResult.error('El mensaje contiene caracteres no permitidos.');
        return validationResult.success(cleanedMessage);
    }, [validationResult]);

    const validators = useMemo(() => ({
        name        : nameValidation,
        phone_number: phoneNumberValidation,
        message     : messageValidation
    }), [nameValidation, phoneNumberValidation, messageValidation]);

    // Validar un campo específico
    const validateField = useCallback((fieldId, value) => {
        const result = validators[fieldId]?.(value);
        if (result) setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [fieldId]: result.isValid ? '' : result.message
        }));
    }, [validators, setFieldErrors]);

    // Validar todos los campos
    const validateAllFields = useCallback(() => {
        const nameResult    = nameValidation(formContent.name);
        const phoneResult   = phoneNumberValidation(formContent.phone_number);
        const messageResult = messageValidation(formContent.message);

        setFieldErrors({
            name        : nameResult.message,
            phone_number: phoneResult.message,
            message     : messageResult.message
        });

        return nameResult.isValid && phoneResult.isValid && messageResult.isValid;
    }, [formContent, nameValidation, phoneNumberValidation, messageValidation]);

    const formHandler = useCallback(async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        
        // Validar todos los campos
        const isFormValid = validateAllFields();
        
        if (!isFormValid) return setIsSubmitting(false);

        // Obtener valores validados
        const validName     = nameValidation(formContent.name).value;
        const validPhone    = phoneNumberValidation(formContent.phone_number).value;
        const validMessage  = messageValidation(formContent.message).value;
        
        try {
            const response = await fetch(`https://formsubmit.co/ajax/${globalInfo.email}`, {
                method  : 'POST',
                headers : {
                    'Content-Type'  : 'application/json',
                    'Accept'        : 'application/json'
                },
                body    : JSON.stringify({
                    _subject: 'Nuevo mensaje desde la web',
                    _captcha: 'false',
                    Nombre  : validName,
                    Numero  : validPhone,
                    WhatsApp: `https://wa.me/549${validPhone}`,
                    Mensaje : validMessage
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                setSubmitStatus('success');
                setFormContent(INITIAL_STATE);
                setFieldErrors(INITIAL_STATE);
                // Auto-ocultar mensaje después de 5 segundos
                setTimeout(() => setSubmitStatus(null), 5000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    }, [INITIAL_STATE, globalInfo, formContent, validateAllFields, nameValidation, phoneNumberValidation, messageValidation]);

    useEffect(() => {
        setCount(formContent.message.length);
    }, [formContent.message]);

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