import {
  addNodeToPath,
  getNodeRadius,
  getNodeColor,
  validateLink,
  trackAction,
  generateURL,
  getLinkLength,
} from "@/lib/lib";
import * as d3 from "d3";
import Color from "color";

// get the maximum level depth of the nodes
const maxLevel = (data) =>
  Math.max.apply(
    Math,
    data.nodes.map(({ level }) => level)
  );

const handleNodeClick = (
  {
    target: {
      __data__: { id, level },
    },
  },
  setAppState,
  pathNodes
) => {
  const newPathNodes = addNodeToPath(id, level, pathNodes);

  // update pathNodes
  setAppState((prev) => ({
    ...prev,
    graph: {
      ...prev.graph,
      pathNodes: newPathNodes,
    },
    search: {
      ...prev.search,
      showResults: false
    }
  }));

  // track click
  trackAction("graphClick", generateURL(newPathNodes));
};

export const graph = (ref, setAppState, data, dimensions, pathNodes) => {
  const simulation = d3
    .forceSimulation()
    .force(
      "link",
      d3
        .forceLink()
        .id((d) => d.id)
        .distance((d) => getLinkLength(d.source.level))
        .strength(1)
    )
    .force("charge", d3.forceManyBody().strength(-800))
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
    .attr("stroke-width", 3)
    .attr("stroke", (link) =>
      Color(getNodeColor(pathNodes[0], "value")).lighten(
        validateLink(pathNodes, link) ? 0 : 0.5
      )
    );

  // render nodes
  var node = svgRef
    .append("g")
    .attr("class", "nodes")
    .attr("class", "cursor-pointer")
    .selectAll("g")
    .data(data.nodes)
    .enter()
    .append("g")
    .attr("class", "hover:brighter")
    .on("click", (e) => handleNodeClick(e, setAppState, pathNodes));

  // render nodes
  node
    .append("circle")
    .attr("r", ({ type }) => getNodeRadius(type))
    .attr("fill", ({ id, level }) => {
      const color = Color(getNodeColor(pathNodes[0], "value")).lighten(
        pathNodes.includes(id) || level === maxLevel(data) ? 0 : 0.5
      );
      return color;
    });

  // attach labels to nodes for getting width
  node
    .append("text")
    .text(({ name }) => name)
    .attr("x", 2)
    .attr("y", 5);

  // add rectangles with respective width
  node
    .append("rect")
    .attr("width", (e) => {
      svgRef.selectAll("text").each(function (d) {
        d.bbox = this.getBBox();
      });
      return e.bbox.width + 2;
    })
    .attr("height", 16)
    .attr("fill", "white")
    .attr("x", 0)
    .attr("y", -8)
    .attr("rx", 2);

  // remove texts
  d3.selectAll("text").remove();

  // add texts back in
  node
    .append("text")
    .text(({ name }) => name)
    .attr("x", 2)
    .attr("y", 5);

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
};
