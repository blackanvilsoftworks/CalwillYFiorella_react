import { useCallback, useMemo, useState } from 'react';
import useMainData from './useMainData.js';

import useAuth from './useAuth.js';
import useSubmitMail from './useSubmitMail.js';

const _INITIAL_SUBMIT_STATUS_STATE = {
    status  : null, // 'success', 'error', null
    message : ''
};
const _SUBMIT_STATUS_MESSAGES = {
    success     : '¡Mensaje enviado con éxito! Te contactaremos pronto.',
    error       : 'Error al enviar el mensaje. Por favor, intenta nuevamente.',
    fieldError  : 'Hay errores en el formulario. Por favor, revisa los campos antes de enviar.'
};
const _NAME_REGEX        = /^[A-Za-zÁáÉéÍíÓóÚúÑñÜü\s]+$/;
const _PHONE_REGEX       = /^[0-9]{10}$/;
const _MESSAGE_REGEX     = /^[A-Za-z0-9ÁáÉéÍíÓóÚúÑñÜü\s.,$!?-]{1,500}$/;
const _VALIDATION_RESULT = {
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

const _getFormData = (profile = null) => ({
    name        : profile?.full_name?.toUpperCase() || '',
    phone_number: profile?.phone                    || '',
    message     : ''
});

const useContactForm = () => {
    const { profile }       = useAuth();
    const { globalInfo }    = useMainData();
    const { sendMail }      = useSubmitMail();

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

    const [ formContent  , setFormContent    ] = useState(_getFormData());
    const [ fieldErrors  , setFieldErrors    ] = useState(_getFormData());
    const [ isSubmitting , setIsSubmitting   ] = useState(false);
    const [ submitStatus , setSubmitStatus   ] = useState(_INITIAL_SUBMIT_STATUS_STATE);

    // Reset form fields to user data from profile (only for the first load)
    const [hasLoadedProfile, setHasLoadedProfile] = useState(false);
    if (profile && !hasLoadedProfile) {
        setFormContent(prev => ({...prev, ..._getFormData(profile)}));
        setHasLoadedProfile(true);
    }

    // Message character counter
    const count = useMemo(() => formContent?.message.length || 0, [formContent.message]);

    const _nameValidation = useCallback((name) => {
        if (!name)                      return _VALIDATION_RESULT.error('El nombre es requerido.');
        if (!_NAME_REGEX.test(name))    return _VALIDATION_RESULT.error('El nombre solo puede contener letras y espacios.');
        return _VALIDATION_RESULT.success(name.toUpperCase());
    }, []);

    const _phoneNumberValidation = useCallback((phone) => {
        const cleanedPhoneNumber = phone.replace(/\D/g, '');
        if (!cleanedPhoneNumber)                    return _VALIDATION_RESULT.error('El número de teléfono es requerido.');
        if (!_PHONE_REGEX.test(cleanedPhoneNumber)) return _VALIDATION_RESULT.error('El número debe tener exactamente 10 dígitos.');
        return _VALIDATION_RESULT.success(cleanedPhoneNumber);
    }, []);

    const _messageValidation = useCallback((message) => {
        if (!message)                       return _VALIDATION_RESULT.error('El mensaje es requerido.');
        if (!_MESSAGE_REGEX.test(message))  return _VALIDATION_RESULT.error('El mensaje contiene caracteres no permitidos.');
        return _VALIDATION_RESULT.success(message);
    }, []);

    const _handleValidationResult = useCallback((id, unvalidatedValue, validationResult) => {
        const { isValid, value, message } = validationResult;
        setFormContent(prev => ({...prev, [id]: isValid ? value : unvalidatedValue}));
        setFieldErrors(prev => ({...prev, [id]: isValid ? ''    : message}));
    }, []);

    const _VALIDATORS = useMemo(() => ({
        name        : _nameValidation,
        phone_number: _phoneNumberValidation,
        message     : _messageValidation
    }), [_nameValidation, _phoneNumberValidation, _messageValidation]);

    const setContentFormState = useCallback((e) => {
        const { id, value } = e.target;
        const upperValue = value.toUpperCase();
        
        // Validate specific field while typing
        _handleValidationResult(id, upperValue, _VALIDATORS[id]?.(upperValue));
    }, [_VALIDATORS, _handleValidationResult]);

    const _validateAllFields = useCallback((values) => Object.entries(values).map(([key, value]) => _handleValidationResult(key, value, _VALIDATORS[key]?.(value))), [_VALIDATORS, _handleValidationResult]);

    const onSubmitFormHandler = useCallback(async (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        setSubmitStatus(_INITIAL_SUBMIT_STATUS_STATE);

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
            setSubmitStatus({
                status: 'error',
                message: _SUBMIT_STATUS_MESSAGES.fieldError
            });
            return setTimeout(() => setSubmitStatus(_INITIAL_SUBMIT_STATUS_STATE), 5000);
        }

        // Send the email with useSubmitMail hook
        const result = await sendMail('Nueva consulta desde la web', {
            Nombre  : currentName,
            Numero  : currentPhone,
            WhatsApp: `https://wa.me/549${currentPhone}`,
            Mensaje : currentMessage
        });
        
        if (result.success) {
            setSubmitStatus({
                status: 'success',
                message: _SUBMIT_STATUS_MESSAGES.success
            });
            // Reset form to initial state (without overwriting with profile if it has changed)
            setFormContent(_getFormData(profile));
            setFieldErrors(_getFormData());
            setTimeout(() => setSubmitStatus(_INITIAL_SUBMIT_STATUS_STATE), 5000);
        } else {
            setSubmitStatus({
                status: 'error',
                message: _SUBMIT_STATUS_MESSAGES.error
            });
        }

        setIsSubmitting(false);
    }, [formContent, sendMail, fieldErrors, _validateAllFields, profile]);

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