export default Capturer;
declare class Capturer {
    constructor(canvas: any, width: any, height: any, frameRate?: number, frameCount?: number, name?: string);
    canvas: any;
    width: any;
    height: any;
    frameRate: number;
    frameCount: number;
    captureName: string;
    recordedBlobs: any[];
    mimeType: string;
    bitsPerSecond: number;
    captureDelay: number;
    activateLink(elem: any, callback: any): void;
    enableCapture(): void;
    started: boolean;
    stream: any;
    mediaRecorder: MediaRecorder;
    captureFrameRemaining: number;
    start(): void;
    onStop(): void;
    onDataAvailable(event: any): void;
    captureFrame(): void;
}
