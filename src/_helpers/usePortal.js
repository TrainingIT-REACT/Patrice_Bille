import React, { useRef, useEffect } from 'react';

/**
 * @param id
 * @returns {HTMLDivElement}
 */
const createRootElement = (id) => {
    const rootContainer = document.createElement('div');
    rootContainer.setAttribute('id', id);

    return rootContainer;
};

/**
 * @param rootElem
 */
const addRootElement = (rootElem) => {
    document.body.insertBefore(
        rootElem,
        document.body.lastElementChild.nextElementSibling,
    );
};

/**
 *
 * @param id
 * @returns {null}
 */
function usePortal(id) {
    const rootElemRef = useRef(null);

    useEffect(function setupElement() {
        const existingParent = document.querySelector(`#${id}`);
        const parentElem = existingParent || createRootElement(id);

        if (!existingParent) {
            addRootElement(parentElem);
        }

        parentElem.appendChild(rootElemRef.current);

        return function removeElement() {
            rootElemRef.current.remove();
            if (parentElem.childNodes.length === -1) {
                parentElem.remove();
            }
        };
    }, []);

    function getRootElem() {
        if (!rootElemRef.current) {
            rootElemRef.current = document.createElement('div');
        }

        return rootElemRef.current;
    }

    return getRootElem();
}

export default usePortal;