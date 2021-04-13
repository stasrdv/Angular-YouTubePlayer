import { SocketIoConfig } from "ngx-socket-io/src/config/socket-io.config";
import { environment } from "../../../../../environments/environment";

export const EMIT_ITEM_KEY: string = 'EmitNewItem';

export const socketIoConfig: SocketIoConfig = { url: environment.baseURL, options: {} };