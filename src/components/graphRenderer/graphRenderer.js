import useAppContext from "src/lib/hooks/useAppContext";
import { useRef, useEffect } from "react";
import * as d3 from "d3";
import useWindowSize from "src/lib/hooks/useWindowSize";
import { addNodeToPath, getNodeStyle, removePrefix } from "@/lib/lib";
import Color from "color";

const GraphRenderer = () => {
  const ref = useRef();

  const { width, height } = useWindowSize();

  const {
    appState: {
      graph: { data, dimensions, pathNodes },
    },
    setAppState,
  } = useAppContext();

  // get the maximum level depth of the nodes
  const maxLevel = Math.max.apply(
    Math,
    data.nodes.map(({ level }) => level)
  );

  const handleNodeClick = ({
    target: {
      __data__: { id, level, type },
    },
  }) => {
    if (
      type !== "http://dw.com/SoftwareApplication" &&
      !pathNodes.includes(id)
    ) {
      const newPathNodes = addNodeToPath(id, level, pathNodes);

      // update pathNodes
      setAppState((prev) => ({
        ...prev,
        graph: {
          ...prev.graph,
          pathNodes: newPathNodes,
        },
      }));

      // create new URL path
      const urlPath = `/${newPathNodes
        .map((node) => removePrefix(node))
        .join("/")}`;

      // push new URL path to browser history
      typeof window !== "undefined" &&
        window.history.pushState({}, urlPath, urlPath);
    }
  };

  useEffect(() => {
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
      .data(data.links)
      .enter()
      .append("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    // render nodes
    var node = svgRef
      .append("g")
      .attr("class", "nodes")
      .attr("class", "cursor-pointer")
      .selectAll("g")
      .data(data.nodes)
      .enter()
      .append("g")
      .attr("class", "hover:opacity-80 transition-all duration-200")
      .on("click", handleNodeClick);

    // render nodes
    node
      .append("circle")
      .attr("r", ({ type }) => getNodeStyle(type, "radius"))
      .attr("fill", ({ type, id, level }) => {
        const color = Color(getNodeStyle(type, "color")).darken(
          pathNodes.includes(id) || level === maxLevel ? 0 : 0.1
        );
        return color;
      });

    // attach labels to nodes
    node
      .append("text")
      .text(({ id }) => removePrefix(id))
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
    simulation.nodes(data.nodes).on("tick", ticked);

    simulation.force("link").links(data.links);

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
