"use client";
import {NextUIProvider} from "@nextui-org/system";
import {useRouter} from 'next/navigation'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {ThemeProviderProps} from "next-themes/dist/types";
import {SWRConfig} from "swr";

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
}

export function Providers({children, themeProps}: ProvidersProps) {
    const router = useRouter();

    return (
        <NextUIProvider navigate={router.push}>
            <SWRConfig
                value={{
                    refreshInterval: 300000,
                    errorRetryInterval: 120000,
                }}>
            <NextThemesProvider attribute={"class"} defaultTheme={"dark"}>{children}</NextThemesProvider>
            </SWRConfig>
        </NextUIProvider>
    );
}
