/** @typedef {typeof __propDef.props}  GenartIndexProps */
/** @typedef {typeof __propDef.events}  GenartIndexEvents */
/** @typedef {typeof __propDef.slots}  GenartIndexSlots */
export default class GenartIndex extends SvelteComponent<{
    pieces: any;
}, {
    pieceDidSelect: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type GenartIndexProps = typeof __propDef.props;
export type GenartIndexEvents = typeof __propDef.events;
export type GenartIndexSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        pieces: any;
    };
    events: {
        pieceDidSelect: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
