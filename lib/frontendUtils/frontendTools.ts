import { IExampleLink } from "../content.interfaces";

export const getExampleLink = (example: Partial<IExampleLink>, full: boolean = true) => {
    const id = example.id ? (example.id[0] === "#" ? example.id : `#${example.id}`) : "";
    return (example.type === "pg" ? "https://playground.babylonjs.com/" + (full ? "full.html" : "") : "https://nme.babylonjs.com/") + id;
};

export const getExampleImageUrl = (example: Partial<IExampleLink>) => {
    return `/img/playgroundsAndNMEs/${example.type}${example.id.replace(/#/g, "-")}.png`;
};

export const getImageUrl = (imageUrl?: string) => {
    return imageUrl || "/img/defaultImage.png";
};

export const getUrlById = (id: string[]) => {
    return `/${id.join("/")}`;
};

export const debounce = <T extends (...args: any[]) => void>(
    func: T,
    wait: number,
    options: {
        invokeOnFirstCall?: boolean;
        maxWait?: number;
    } = {},
) => {
    let timeout: number = 0;
    let lastInvocationTime: number = 0;

    function callFunc(args: Parameters<T>): void {
        lastInvocationTime = Date.now();
        func.apply(null, args);
    }

    function shouldInvoke(): boolean {
        const now = Date.now();
        const timeSinceLastInvocation = now - lastInvocationTime;

        return (options.maxWait && timeSinceLastInvocation >= options.maxWait) || (!lastInvocationTime && !!options.invokeOnFirstCall);
    }

    return (...args: Parameters<T>) => {
        if (shouldInvoke()) {
            callFunc(args);
        }

        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => callFunc(args), wait);
    };
};

export const throttle = <T extends (...args: any[]) => void>(func: T, wait: number) => {
    return debounce(func, wait, { invokeOnFirstCall: true, maxWait: wait });
};