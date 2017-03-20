export interface IGeoLocateRequest{
    success: Function;
    error?: Function;
    not_supported?: Function;
    always?: Function;
    complete?: Function;
    options?: PositionOptions;
}