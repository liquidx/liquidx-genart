/** @typedef {typeof __propDef.props}  GenartProps */
/** @typedef {typeof __propDef.events}  GenartEvents */
/** @typedef {typeof __propDef.slots}  GenartSlots */
export default class Genart extends SvelteComponent<{
    indexLabel?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type GenartProps = typeof __propDef.props;
export type GenartEvents = typeof __propDef.events;
export type GenartSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        indexLabel?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
