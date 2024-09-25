import React, { createContext, useState, useEffect, ReactNode } from 'react';
import Resource from "@models/Resource";
import DIContainer from "@web/dicontainer";

export interface ResourceContextType {
    resource: Resource | null;
    fetchResources: () => Promise<void>;
}

export const ResourceContext = createContext<ResourceContextType | null>(null);

interface ResourceProviderProps {
    children: ReactNode;
}

const resourceService = DIContainer.getResourceUseCase();

export const ResourceProvider: React.FC<ResourceProviderProps> = ({ children }) => {
    const [resource, setResource] = useState<Resource | null>(() => {
        const savedResource = sessionStorage.getItem('resource');
        return savedResource ? Resource.fromJSON(JSON.parse(savedResource)) : null;
    });

    const fetchResources = async () => {
        try {
            const resource: Resource = await resourceService.getResources();
            setResource(resource);
            sessionStorage.setItem('resource', JSON.stringify(resource.toJSON()));
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (!resource) {
            fetchResources();
        }
    }, [resource]);

    return (
        <ResourceContext.Provider value={{ resource, fetchResources }}>
            {children}
        </ResourceContext.Provider>
    );
};
