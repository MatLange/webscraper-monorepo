declare namespace jest {
    type MatcherResult = {
        pass: boolean;
        message?: () => string;
    };

    type CustomMatcher = (received: any, ...args: any[]) => MatcherResult;

    interface Matchers<R> {
        toBe(value: any): CustomMatcher;
        toEqual(value: any): CustomMatcher;
        // Add more matcher methods here...
    }

    function describe(description: string, spec: () => void): void;
    function it(description: string, spec: () => void): void;
    function expect<T>(received: T): Matchers<T>;
}