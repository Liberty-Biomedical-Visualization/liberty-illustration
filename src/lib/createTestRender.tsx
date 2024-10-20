import { render } from "@testing-library/react";
import type { JSX, JSXElementConstructor } from "react";

/**
 * Returns a function that allows rendering Component with partial props while
 * falling back to defaultProps for testing purposes.
 */
export default function createTestRender<C extends JSXElementConstructor<P>, P>(
  Component: JSXElementConstructor<P> & C,
  defaultProps: JSX.LibraryManagedAttributes<C, P>,
) {
  return function (props: Partial<P> = {}) {
    const resolvedProps: JSX.IntrinsicAttributes &
      JSX.LibraryManagedAttributes<C, P> = { ...defaultProps, ...props };
    return render(<Component {...resolvedProps} />);
  };
}
