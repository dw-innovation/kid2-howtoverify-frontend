import useAppContext from "src/lib/hooks/useAppContext";
import { useRef, useEffect } from "react";
import * as d3 from "d3";
import useWindowSize from "src/lib/hooks/useWindowSize";
import { addNodeToPath } from "@/lib/api/lib";
import { getNodeStyle } from "@/lib/lib";

let d3links = [];
let d3nodes = [];

const GraphRenderer = () => {
  const ref = useRef();

  const { width, height } = useWindowSize();

  const {
    appState: {
      graph: { data, dimensions, pathNodes },
    },
    setAppState,
  } = useAppContext();

  useEffect(() => {
    if (d3nodes.length === 0) {
      // initialize d3nodes with data.nodes
      d3nodes = data.nodes;
    } else {
      // if initialized push a test node
      d3nodes.push({
        id: "it-video",
        name: "video",
        type: "inputType",
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
      });
    }

    console.log(d3nodes)

    if (d3links.length === 0) {
      d3links = data.links;
    }

    console.log(d3links);

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

    const simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3
          .forceLink()
          .id((d) => d.id)
          .distance(60)
          .strength(1)
      )
      .force("charge", d3.forceManyBody().strength(-80))
      .force(
        "center",
        d3.forceCenter(dimensions.width / 2, dimensions.height / 2)
      );
    const svgRef = d3.select(ref.current);

    // clear svg
    svgRef.selectAll("*").remove();

    // render links
    var link = svgRef
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(d3links)
      .enter()
      .append("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    // render nodes
    var node = svgRef
      .append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(d3nodes)
      .enter()
      .append("g")
      .on(
        "click",
        ({
          target: {
            __data__: { id, type },
          },
        }) => {
          type !== "tool" &&
            !pathNodes.includes(id) &&
            setAppState((prev) => ({
              ...prev,
              graph: {
                ...prev.graph,
                pathNodes: addNodeToPath(id, prev.graph.pathNodes),
              },
            }));
        }
      );

    // render nodes
    node
      .append("circle")
      .attr("r", ({ type }) => getNodeStyle(type, "radius"))
      .attr("fill", ({ type }) => getNodeStyle(type, "color"));

    // attach labels to nodes
    node
      .append("text")
      .text((d) => d.id)
      .attr("x", 6)
      .attr("y", 3);

    const ticked = () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    };

    // runs at every re-rendering of for force graph simulation
    simulation.nodes(d3nodes).on("tick", ticked);

    simulation.force("link").links(d3links);

    const dragStarted = (event, d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragging = (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    };

    const dragEnded = (event, d) => {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    const dragHandler = d3
      .drag()
      .on("start", dragStarted)
      .on("drag", dragging)
      .on("end", dragEnded);

    dragHandler(node);
  }, [data, ref.current, height, width]);

  return <svg ref={ref} className="h-full w-full" />;
};

export default GraphRenderer;
