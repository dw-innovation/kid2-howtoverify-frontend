import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import graph from "@/data/sample.json";
import { v4 as uuidv4 } from "uuid";

const IndexPage = () => {
  const [data, setData] = useState(graph);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });
  const ref = useRef();

  useEffect(() => {
    setDimensions({
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
    });
    const simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3.forceLink().id((d) => d.id)
      )
      .force("charge", d3.forceManyBody())
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
      .selectAll("g")
      .data(data.nodes)
      .enter()
      .append("g");

    // render nodes
    node
      .append("circle")
      .attr("r", ({ type }) => {
        switch (type) {
          case "inputType":
            return 15;
          case "question":
            return 10;
          case "workflow":
            return 5;
          case "tool":
            return 2;
        }
      })
      .attr("fill", ({ type }) => {
        switch (type) {
          case "inputType":
            return "blue";
          case "question":
            return "yellow";
          case "workflow":
            return "red";
          case "tool":
            return "green";
        }
      });

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
  }, [data, ref.current]);

  return (
    <div className="w-screen h-screen relative">
      <button
        onClick={() => {
          const uuid = uuidv4();
          setData((prev) => ({
            nodes: [
              ...prev.nodes,
              {
                id: uuid,
                name: "Image",
                type: "inputType",
              },
            ],
            links: [
              ...prev.links,
              {
                source: "t-10",
                target: uuid,
              },
            ],
          }));
        }}
        className="py-2 px-4 bg-slate-200 hover:bg-slate-600 absolute top-0 left-0"
      >
        add
      </button>
      <svg ref={ref} className="h-full w-full" />
    </div>
  );
};

export default IndexPage;
