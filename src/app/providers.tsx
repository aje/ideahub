"use client";
import {NextUIProvider} from "@nextui-org/system";
import {useRouter} from "next/navigation";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {SWRConfig} from "swr";
import {createContext, ReactNode, useContext, useState} from "react";

export interface DialogContextType {
    dialogs: Set<string>;
    // eslint-disable-next-line no-unused-vars
    addDialog: (dialog: string) => void;
    // eslint-disable-next-line no-unused-vars
    removeDialog: (dialog: string) => void;

    // eslint-disable-next-line no-unused-vars
    toggleDialog(dialog: string): (isOpen: boolean) => void;
}

export const DialogContext = createContext<DialogContextType>({
    dialogs: new Set<string>(),
    addDialog: () => {},
    removeDialog: () => {},
    toggleDialog: () => () => {},
});

export function useDialog() {
    return useContext(DialogContext);
}

const DialogProvider = ({children}) => {
    const [dialogs, setDialogs] = useState<Set<string>>(new Set<string>());

    const addDialog = (dialog: string) => {
        const t = dialogs;
        t.add(dialog);
        setDialogs(t);
    };

    const removeDialog = (dialog: string) => {
        const t = dialogs;
        t.delete(dialog);
        setDialogs(t);
    };

    const toggleDialog = (dialog: string) => (isOpen: boolean) => {
        if (isOpen) addDialog(dialog);
        else removeDialog(dialog);
    };

    const value: DialogContextType = {dialogs, addDialog, removeDialog, toggleDialog};

    return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
};

export function Providers({children}: {children: ReactNode}) {
    const router = useRouter();

    return (
        <NextUIProvider navigate={router.push}>
            <SWRConfig
                value={{
                    refreshInterval: 300000,
                    errorRetryInterval: 120000,
                }}>
                <NextThemesProvider attribute={"class"} defaultTheme={"dark"}>
                    <DialogProvider>{children}</DialogProvider>
                </NextThemesProvider>
            </SWRConfig>
        </NextUIProvider>
    );
}
