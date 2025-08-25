import { useEffect } from 'react';
import { API_URL } from '../config';
import type { OnlineUser } from '../../../backend/src/types/shared/types';

const fetchGeneratePersonalCode = async (): Promise<{ personalCode: string }> => {
    const res = await fetch(`${API_URL}/generate-personal-code`);
    return res.json();
};

const fetchIsPersonalCodeValid = async (personalCode: string): Promise<{ valid: boolean }> => {
    const res = await fetch(`${API_URL}/is-personal-code-valid?personalCode=${personalCode}`);
    return res.json();
};

export function usePersonalCode(socketId?: string, postAddUser?: (user: OnlineUser) => void) {
    useEffect(() => {
        if (!socketId || !postAddUser) return;

        const handle = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            let personalCode = urlParams.get('personalCode');

            if (!personalCode) {
                const { personalCode: generated } = await fetchGeneratePersonalCode();
                personalCode = generated;
                urlParams.set('personalCode', personalCode);
                window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
            } else {
                const { valid } = await fetchIsPersonalCodeValid(personalCode);
                if (!valid) {
                    urlParams.delete('personalCode');
                    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
                    window.location.reload();
                    return;
                }
            }

            postAddUser({ socketId, personalCode });
        };

        handle();
    }, [socketId, postAddUser]);
}