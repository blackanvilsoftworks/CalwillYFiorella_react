import { 
    nameRegex,
    phoneNumberRegex,
    messageRegex
} from './data.js';

export const nameValidation = (inputName) => {
    const cleanedName = inputName.value.trim();
    if (!nameRegex.test(cleanedName)) {
        alert('El nombre solo puede contener letras y espacios.');
        return '';
    }
    return cleanedName.toUpperCase(); // Convertir a mayúsculas
};

export const phoneNumberValidation = (inputPhoneNumber) => {
    const cleanedPhoneNumber = inputPhoneNumber.value.trim().replace(/\D/g, '');
    if (!phoneNumberRegex.test(cleanedPhoneNumber)) {
        alert('El número de teléfono no puede contener espacios ni guines, y debe tener 10 caracteres.');
        return '';
    }    
    return cleanedPhoneNumber; 
};

export const messageValidation = (inputMessage) => {
    const cleanedMessage = inputMessage.value.trim();
    if (!messageRegex.test(cleanedMessage)) {
        alert('El mensaje no puede contener caracteres especiales.');
        return '';
    }
    return cleanedMessage; 
};