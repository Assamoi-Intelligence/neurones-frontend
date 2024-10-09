import { ReactNode } from "react";
import {NextUIProvider} from "@nextui-org/react";

interface NextUIProviderSetupProps {
 children: ReactNode
}

const NextUIProviderSetup = ({children}: NextUIProviderSetupProps) => {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    );
}
export default NextUIProviderSetup