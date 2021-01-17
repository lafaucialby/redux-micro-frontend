import { IAction } from './actions/action.interface';
import { AbstractLogger as ILogger } from './common/abstract.logger';
import { IGlobalStore } from './common/interfaces/global.store.interface';
import { Store, Reducer, Middleware } from 'redux';
/**
 * Summary Global store for all Apps and container shell (Platform) in Micro-Frontend application.
 * Description Singleton class to be used all all Apps for registering the isolated App States. The platform-level and global-level store can be accessed from this class.
 */
export declare class GlobalStore implements IGlobalStore {
    private _logger;
    static readonly Platform: string;
    static readonly AllowAll: string;
    static readonly InstanceName: string;
    static DebugMode: boolean;
    private _stores;
    private _globalActions;
    private _globalListeners;
    private _actionLogger;
    private constructor();
    /**
     * Summary Gets the singleton instance of the Global Store.
     *
     * @param {ILogger} logger Logger service.
     */
    static Get(debugMode?: boolean, logger?: ILogger): IGlobalStore;
    /**
     * Summary: Creates and registers a new store
     *
     * @access public
     *
     * @param {string} appName Name of the App for whom the store is getting creating.
     * @param {Reducer} appReducer The root reducer of the App. If partner app is using multiple reducers, then partner App must use combineReducer and pass the root reducer
     * @param {Array<Middleware>} middlewares List of redux middlewares that the partner app needs.
     * @param {boolean} shouldReplaceStore Flag to indicate if the Partner App wants to replace an already created/registered store with the new store.
     * @param {boolean} shouldReplaceReducer Flag to indicate if the Partner App wants to replace the existing root Reducer with the given reducer. Note, that the previous root Reducer will be replaced and not updated. If the existing Reducer needs to be used, then partner app must do the append the new reducer and pass the combined root reducer.
     *
     * @returns {Store<any, any>} The new Store
     */
    CreateStore(appName: string, appReducer: Reducer, middlewares?: Array<Middleware>, globalActions?: Array<string>, shouldReplaceStore?: boolean, shouldReplaceReducer?: boolean): Store<any, any>;
    /**
     * Summary: Registers an isolated app store
     *
     * @access public
     *
     * @param {string} appName Name of the App.
     * @param {Store} store Instance of the store.
     * @param {boolean} shouldReplace Flag to indicate if the an already registered store needs to be replaced.
     */
    RegisterStore(appName: string, store: Store, globalActions?: Array<string>, shouldReplaceExistingStore?: boolean): void;
    /**
     * Summary: Registers a list of actions for an App that will be made Global.
     * Description: Global actions can be dispatched on the App Store by any Partner Apps. If partner needs to make all actions as Global, then pass "*" in the list. If no global actions are registered then other partners won't be able to dispatch any action on the App Store.
     *
     * @access public
     *
     * @param {string} appName Name of the app.
     * @param {Array<string>} actions List of global action names.
     */
    RegisterGlobalActions(appName: string, actions?: Array<string>): void;
    /**
     * Summary: Gets the current state of the Platform
     *
     * @access public
     *
     * @returns Current Platform State (App with name Platform)
     */
    GetPlatformState(): any;
    /**
     * Summary: Gets the current state of the given Partner.
     * Description: A read-only copy of the Partner state is returned. The state cannot be mutated using this method. For mutation dispatch actions. In case the partner hasn't been registered or the partner code hasn't loaded, the method will return null.
     *
     * @param partnerName Name of the partner whose state is needed
     *
     * @returns {any} Current partner state.
     */
    GetPartnerState(partnerName: string): any;
    /**
     * Summary: Gets the global store.
     * Description: The global store comprises of the states of all registered partner's state.
     * Format
     * {
     *      Platform: { ...Platform_State },
     *      Partner_Name_1: { ...Partner_1_State },
     *      Partner_Name_2: { ...Partner_2_State }
     * }
     *
     * @access public
     *
     * @returns {any} Global State.
     */
    GetGlobalState(): any;
    /**
     * Summary: Dispatches an action on all the Registered Store (including Platform level store).
     * Description: The action will be dispatched only if the Partner App has declated the action to be global at it's store level.
     *
     * @access public
     *
     * @param {string} source Name of app dispatching the Actions
     * @param {IAction<any>} action Action to be dispatched
     */
    DispatchGlobalAction(source: string, action: IAction<any>): void;
    /**
     * Summary: Dispatched an action of the local store
     *
     * @access public
     *
     * @param {string} source Name of app dispatching the Actions
     * @param {IAction<any>} action Action to be dispatched
     */
    DispatchLocalAction(source: string, action: IAction<any>): void;
    /**
     * Summary: Dispatches an action at a local as well global level
     *
     * @access public
     *
     * @param {string} source Name of app dispatching the Actions
     * @param {IAction<any>} action Action to be dispatched
     */
    DispatchAction(source: string, action: IAction<any>): void;
    /**
     * Summary: Subscribe to current store's state changes
     *
     * @param {string} source Name of the application
     * @param {(state: any) => void} callback Callback method to be invoked when state changes
     */
    Subscribe(source: string, callback: (state: any) => void): () => void;
    /**
     * Summary: Subscribe to any change in the Platform's state.
     *
     * @param {string} source Name of application subscribing to the state changes.
     * @param {(state: any) => void} callback Callback method to be called for every platform's state change.
     *
     * @returns {() => void} Unsubscribe method. Call this method to unsubscribe to the changes.
     */
    SubscribeToPlatformState(source: string, callback: (state: any) => void): () => void;
    /**
     * Summary: Subscribe to any change in the Partner App's state.
     *
     * @access public
     *
     *
     * @param {string} source Name of the application subscribing to the state changes.
     * @param {string} partner Name of the Partner application to whose store is getting subscribed to.
     * @param {(state: any) => void} callback Callback method to be called for every partner's state change.
     *
     * @throws Error when the partner is yet to be registered/loaded or partner doesn't exist.
     *
     * @returns {() => void} Unsubscribe method. Call this method to unsubscribe to the changes.
     */
    SubscribeToPartnerState(source: string, partner: string, callback: (state: any) => void): () => void;
    /**
     * Summary: Subscribe to any change in the Global State, including Platform-level and Partner-level changes.
     *
     * @access public
     *
     * @param {string} source Name of the application subscribing to the state change.
     * @param {(state: any) => void} callback Callback method to be called for every any change in the global state.
     *
     * @returns {() => void} Unsubscribe method. Call this method to unsubscribe to the changes.
     */
    SubscribeToGlobalState(source: string, callback: (state: any) => void): () => void;
    SetLogger(logger: ILogger): void;
    private InvokeGlobalListeners;
    private GetPlatformStore;
    private GetPartnerStore;
    private GetGlobalMiddlewares;
    private IsActionRegisteredAsGlobal;
    private LogRegistration;
    private CopyState;
}
