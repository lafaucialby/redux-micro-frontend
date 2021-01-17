import { AbstractLogger } from "./abstract.logger";
export declare class ConsoleLogger extends AbstractLogger {
    private _debugMode;
    constructor(_debugMode?: boolean);
    processEvent(source: string, eventName: string, properties: any): void;
    processException(source: string, error: Error, properties: any): void;
}
