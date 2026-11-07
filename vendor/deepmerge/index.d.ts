declare function deepmerge(target: unknown, source: unknown, options?: unknown): any;

declare namespace deepmerge {
  function all(values: unknown[], options?: unknown): any;
}

export default deepmerge;
