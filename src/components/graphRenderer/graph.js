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
import { without } from "lodash/fp";
import { cloneDeep } from "lodash";

// so the graph does not reset every time, we have to store a mutable copy of the
// nodes, that keeps their position and so on in memory.
let nodes = [];

// We need to track the clicked position in this very hacky way.
// This is because we want new nodes to appear where the user clicked, so
// they don't start at a strange place and throw the whole graph around.
// so, we store them on click, and then set that to the position of the new nodes.
let clickedX = 0;
let clickedY = 0;

// two utility functions to add nodes.
const nodeId = (n) => n.id;
const linkId = (l) => (l.source.id || l.source) + (l.target.id || l.target);

// Here is the algorithm to update new nodes based on a new full list of nodes.  We receive new nodes,
// diff them with the old ones, and then remove any we do not want.
// doing this hopefully keeps the system with react in sync.
// probably not the most efficient, but it works.
const updateNodes = (_newNodes, pathNodes) => {
  //nodes = nodes.map((node) => ({ ...node, fx: node.x, fy: node.y }));

  const newNodes = cloneDeep(_newNodes);
  const newIds = newNodes.map(nodeId);
  const oldIds = nodes.map(nodeId);
  const toAddIds = without(oldIds, newIds);
  const toRemoveIds = without(newIds, oldIds);
  // remove nodes that dont exist in there any more
  for (var i = nodes.length - 1; i >= 0; i--) {
    const currentId = nodeId(nodes[i]);
    if (toRemoveIds.includes(currentId)) {
      nodes.splice(i, 1);
    }
  }
  // add new nodes
  for (var i = newNodes.length - 1; i >= 0; i--) {
    const currentNode = newNodes[i];
    const currentId = nodeId(currentNode);
    // if a clicked position has been stored, use it as the starting position of the new node
    if (pathNodes.includes(currentId)) {
      currentNode.x = pathNodes.indexOf(currentId) * 100;
      currentNode.y = pathNodes.indexOf(currentId) * 100;
    }
    if (clickedX && clickedY) {
      currentNode.x = clickedX;
      currentNode.y = clickedY;
    }
    if (toAddIds.includes(currentId)) {
      nodes.push(currentNode);
    }
  }
};

// get the maximum level depth of the nodes
const maxLevel = (data) =>
  Math.max.apply(
    Math,
    data.nodes.map(({ level }) => level)
  );

const handleNodeClick = (
  // the event:
  {
    target: {
      __data__: { id, level, x, y },
    },
  },
  // the state setting function
  setAppState,
  pathNodes
) => {
  if (id === pathNodes.at(-1)) return null;
  const newPathNodes = addNodeToPath(id, level, pathNodes);
  // we received a click so we will hackily store our clicked position
  clickedX = x;
  clickedY = y;

  // update pathNodes
  setAppState((prev) => ({
    ...prev,
    graph: {
      ...prev.graph,
      pathNodes: newPathNodes,
    },
    search: {
      ...prev.search,
      showResults: false,
    },
  }));

  // track click
  trackAction("graphClick", generateURL(newPathNodes));
};

export const updateGraph = (ref, setAppState, data, dimensions, pathNodes) => {
  //
  updateNodes(data.nodes, pathNodes);

  // reset our clicked position after the nodes have been added
  clickedX = 0;
  clickedY = 0;

  // for testing purposes, define up here which nodes and which links our function has to use.
  const localLinks = data.links;
  const localNodes = nodes;

  // console.log("rendering d3 with:", "nodes", localNodes, "links", localLinks);

  const svgRef = d3.select(ref.current);

  // we do a slightly different strategy for links and nodes.
  // links we just delete and re-draw since the positioning is actually stored in the nodes.
  // this saves us some code and mental stability.
  svgRef.selectAll(".links").remove();

  var link = svgRef.selectAll(".links").data(localLinks, linkId);

  var newLink = link
    .enter()
    .append("g")
    .attr("class", "links")
    .attr("id", (d) => linkId(d))
    .attr("from", (d) => d.source)
    .attr("to", (d) => d.target)
    .merge(link);

  var line = newLink
    .append("line")
    .attr("stroke-width", 3)
    .attr("stroke", (link) =>
      Color(getNodeColor(pathNodes[0], "value")).lighten(
        validateLink(pathNodes, link) ? 0 : 0.5
      )
    );

  // render nodes
  // nodes are different, we make sure that we keep them in memory here.
  var node = svgRef.selectAll(".nodes").data(localNodes, nodeId);

  // we remove nodes that are no longer in the mutable array
  var removeNode = node.exit().remove();

  // new nodes get what we expect added to them
  var newNode = node
    .enter()
    .append("g")
    .merge(node)
    .attr("class", "nodes")
    .attr("id", (d) => nodeId(d));

  // render nodes
  var circle = newNode
    .append("circle")
    .attr("r", ({ type }) => getNodeRadius(type))
    .attr("fill", ({ id, level }) => {
      const color = Color(getNodeColor(pathNodes[0], "value")).lighten(
        pathNodes.includes(id) ||
          level === maxLevel({ nodes: localNodes, links: localLinks })
          ? 0
          : 0.7
      );
      return color;
    })
    .attr("class", "hover:brighter")
    .on("click", (e) => handleNodeClick(e, setAppState, pathNodes));

  // attach labels to nodes for getting width
  var text = newNode
    .append("text")
    .text(({ name }) => name)
    .attr("x", 2)
    .attr("y", 5);

  // add rectangles with respective width
  var rect = newNode
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
  newNode
    .append("text")
    .text(({ name }) => name)
    .attr("x", 2)
    .attr("y", 5)
    .attr("class", "cursor-pointer")
    .on("click", (e) => handleNodeClick(e, setAppState, pathNodes));

  // make sure the links are always behind the nodes, this is the d3 way to z-index:
  d3.selectAll(".links").lower();
  d3.selectAll(".circles").lower();

  const ticked = () => {
    line
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
  };

  const simulation = d3
    .forceSimulation()
    .alphaDecay(0.1)
    //.velocityDecay(0.1)
    .force(
      "link",
      d3
        .forceLink()
        .id((d) => {
          return d.id;
        })
        .distance(
          (d) =>
            getLinkLength(d.source.level !== undefined ? d.source.level : 0) * 1
        )
        .strength(1)
    )
    .force("charge", d3.forceManyBody().strength(-800))
    .force(
      "center",
      d3.forceCenter(dimensions.width / 2, dimensions.height / 2)
    );

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

  // runs at every re-rendering of for force graph simulation
  simulation.nodes(localNodes).on("tick", ticked);

  simulation.force("link").links(localLinks);

  simulation.restart();

  simulation.alpha(1);
};
