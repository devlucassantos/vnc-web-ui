import { useEffect } from 'react';

const useDisableFocus = (isDisabled: boolean, parentRef: React.RefObject<HTMLElement>) => {
    useEffect(() => {
        if (isDisabled && parentRef.current) {
            const focusableElements = parentRef.current.querySelectorAll(
                'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
            );

            focusableElements.forEach((element) => {
                element.setAttribute('tabindex', '-1');
            });


            return () => {
                focusableElements.forEach((element) => {
                    element.removeAttribute('tabindex');
                });
            };
        }
    }, [isDisabled, parentRef]);
};

export default useDisableFocus;