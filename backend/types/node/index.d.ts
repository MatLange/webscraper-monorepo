
declare module 'node' {

    // Add your type definitions for Node.js here

    // For example:

    

    // Global objects

    global {

        // Add global variables and functions here

        const myGlobalVariable: string;

        function myGlobalFunction(): void;

        var signin: () => Promise<string[]>; // Add this line to declare the global signin function
        //agent: typeof stAgent & ((app?: App, options?: STAgentOptions) => InstanceType<typeof stAgent>);
    }

    

    // Modules

    module 'fs' {

        // Add type definitions for the 'fs' module here

        // For example:

        

        export function readFile(path: string, options: { encoding: string }, callback: (err: Error | null, data: string) => void): void;

        export function writeFile(path: string, data: string, options: { encoding: string }, callback: (err: Error | null) => void): void;

    }

    

    module 'http' {

// Add type definitions for the 'http' module here

// For example:

export interface IncomingMessage {/*...*/}



        export interface ServerResponse {/*...*/}



        export function createServer(requestListener?: (req: IncomingMessage, res: ServerResponse) => void): Server;

    }

    

    // Add more module declarations as needed

    

}
