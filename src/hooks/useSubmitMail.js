import { useState } from 'react';
import useMainData from './useMainData';

const useSubmitMail = () => {
    const { globalInfo } = useMainData();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const sendMail = async (subject, formData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(`https://formsubmit.co/ajax/${globalInfo.email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: subject,
                    _captcha: 'false',
                    ...formData
                })
            });

            if (!response.ok) throw new Error(`HTTP error ${response.status}`);

            const data = await response.json();

            if (data.success === 'false') throw new Error(data.message || 'Error al enviar el formulario');

            setSuccess(true);
            return { success: true, data };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    return { sendMail, loading, error, success };
};

export default useSubmitMail;