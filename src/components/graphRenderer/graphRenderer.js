import useAppContext from "src/lib/hooks/useAppContext";
import { useRef, useLayoutEffect } from "react";
import useWindowSize from "src/lib/hooks/useWindowSize";
import { graph } from "./graph";

const GraphRenderer = () => {
  const ref = useRef();

  const { width, height } = useWindowSize();

  const {
    appState: {
      graph: { data, dimensions, pathNodes },
    },
    setAppState,
  } = useAppContext();

  useLayoutEffect(() => {
    setAppState((prev) => ({
      ...prev,
      graph: {
        ...prev.graph,
        dimensions: {
          width: ref.current.clientWidth,
          height: ref.current.clientHeight,
        },
      },
    }));
    graph(ref, setAppState, data, dimensions, pathNodes);
  }, [data, ref.current, height, width]);

  return <svg ref={ref} className="h-full w-full" />;
};

export default GraphRenderer;
