/** @typedef {typeof __propDef.props}  GenartViewerProps */
/** @typedef {typeof __propDef.events}  GenartViewerEvents */
/** @typedef {typeof __propDef.slots}  GenartViewerSlots */
export default class GenartViewer extends SvelteComponent<{
    piece: any;
    backLabel: any;
}, {
    indexDidSelect: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type GenartViewerProps = typeof __propDef.props;
export type GenartViewerEvents = typeof __propDef.events;
export type GenartViewerSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        piece: any;
        backLabel: any;
    };
    events: {
        indexDidSelect: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
