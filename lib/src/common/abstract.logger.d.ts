/**
 * Summary Logs data from application. Follows a Chain of Responsibility pattern where multiple loggers can be chained.
 */
export declare abstract class AbstractLogger {
    LoggerIdentity: String;
    NextLogger: AbstractLogger;
    constructor(id: string);
    /**
     * Summary Logs an event
     * @param source Location from where the log is sent
     * @param eventName Name of the event that has occurred
     * @param properties Properties (KV pair) associated with the event
     */
    LogEvent(source: string, eventName: string, properties: any): void;
    /**
     * Summary Logs an error in the system
     * @param source Location where the error has occurred
     * @param error Error
     * @param properties Custom properties (KV pair)
     */
    LogException(source: string, error: Error, properties: any): void;
    /**
     * Summary Sets the next logger in the chain. If the next logger is already filled then its chained to the last logger of the chain
     * @param nextLogger Next Logger to be set in the chain
     */
    SetNextLogger(nextLogger: AbstractLogger): void;
    private isLoggerLoopCreated;
    abstract processEvent(source: string, eventName: string, properties: any): any;
    abstract processException(source: any, error: Error, properties: any): any;
}
