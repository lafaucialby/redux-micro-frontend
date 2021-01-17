import { Middleware } from 'redux';
import { AbstractLogger as ILogger } from '../common/abstract.logger';
/**
 * Summary Logs action and its impact on the state
 */
export declare class ActionLogger {
    private _logger;
    constructor(_logger: ILogger);
    /**
     * Summary Creates as Redux middleware for logging the actions and its impact on the State
     */
    CreateMiddleware(): Middleware;
    SetLogger(logger: ILogger): void;
    private IsLoggingAllowed;
    private LogActionDispatchStart;
    private LogActionDispatchComplete;
    private LogActionDispatchFailure;
}
