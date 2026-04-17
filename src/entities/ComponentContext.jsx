import React, { createContext, useContext, useState, useCallback } from 'react';

const DynamicComponentContext = createContext();

export const DynamicComponentProvider = ({ children }) => {
    const [Component, setComponent] = useState(() => () => null);
    const [props, setProps] = useState({});

    const changeComponent = useCallback((NewComponent, newProps = {}) => {
        setComponent(() => NewComponent);
        setProps(newProps);
    }, []);

    const clearComponent = useCallback(() => {
        setComponent(() => () => null);
        setProps({});
    }, []);

    const value = { Component, props, changeComponent, clearComponent };

    return (
        <DynamicComponentContext.Provider value={value}>
            {children}
        </DynamicComponentContext.Provider>
    );
};

export const useDynamicComponent = () => {
    const context = useContext(DynamicComponentContext);
    if (!context) throw new Error('useDynamicComponent must be used within DynamicComponentProvider');
    return context;
};

export const DynamicComponentContainer = () => {
    const { Component, props } = useDynamicComponent();
    return <Component {...props} />;
};