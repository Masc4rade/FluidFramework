import { SharedMap } from "@fluidframework/map";
import { getRandomName } from '@fluidframework/server-services-client'
import { AzureClientProps, AzureRemoteConnectionConfig, IUser} from "@fluidframework/azure-client"
import { InsecureTokenProvider } from "@fluidframework/test-runtime-utils"
import { getSession } from "next-auth/react";

export const useAzure = "azure";

//colocar todos as entries aqui

export const containerSchema = {
    initialObjects: {
        entries: SharedMap
    }
}

export const userConfig = async() : Promise<IUser>=> {
    const session = await getSession();
    const user = session?.user;

    return{
        id: user?.email ?? ''
    }
}

export const connection : AzureRemoteConnectionConfig = {
    tenantId: "",
    tokenProvider: new InsecureTokenProvider(process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID as string, await userConfig()),
    endpoint: process.env.NEXTAUTH_URL as string,
    type: "remote"
}

export const connectionConfig: AzureClientProps = useAzure ? { 
    connection
} : { 
    connection
};