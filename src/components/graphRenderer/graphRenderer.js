import React from 'react';
import useAppContext from "src/lib/hooks/useAppContext";
import { useRef, useLayoutEffect } from "react";
import useWindowSize from "src/lib/hooks/useWindowSize";
import { updateGraph } from "./graph";

// the <svg> element will be controlled by d3 completely and never needs to get updated.
const RenderOnce = React.memo((props) => {
  return <svg ref={props.svgref} className="h-full w-full" />;
})

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

    // I'll be honest, I have no idea why this has to be run twice to work,
    // and I don't really need to find out.  It's inneficient, but so is rendering a blog as a graph
    updateGraph(ref, setAppState, data, dimensions, pathNodes);
    updateGraph(ref, setAppState, data, dimensions, pathNodes);

  }, [data, ref.current, height, width]);

  // send this to the element that just needs to be rendered once.
  return <RenderOnce svgref={ref}/> ;
};

export default GraphRenderer;
