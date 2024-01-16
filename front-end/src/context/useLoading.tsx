import { ReactNode, createContext, useContext, useState } from "react";

interface ILoading{
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = {
    children: ReactNode
}

const LoadingContext = createContext<ILoading | null>(null);

export function LoadingProvider({ children }: Props){

    const [loading, setLoading] = useState<boolean>(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            { children }
        </LoadingContext.Provider>
    )
}

export function useLoading(): ILoading {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading deve ser usado dentro de um LoadingProvider');
    }
    return context;
}
