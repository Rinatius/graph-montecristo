
export function toGraph(result, graph) {
    result.records.forEach((records, i) => {
        records.keys.forEach((key) => {
            const nodge = records.get(key)
            if (nodge.hasOwnProperty('start')) { //Check if it is edge
                graph.edges[nodge.identity.low] = {
                    source: nodge.start.low,
                    target: nodge.end.low,
                    type: nodge.type,
                    properties: nodge.properties
                }
            } else {
                graph.nodes[nodge.identity.low] = {
                    id: nodge.identity.low,
                    labels: nodge.labels,
                    properties: nodge.properties
                }
            }
        })
    })
    return graph;
}
export function reconcileGraphs(vGraph, iGraph) {
    Object.keys(iGraph.edges).forEach((key) => {
        if (Object.keys(vGraph.nodes).includes(iGraph.edges[key].source.toString()) &&
            Object.keys(vGraph.nodes).includes(iGraph.edges[key].target.toString())) {
            vGraph.edges[key] = iGraph.edges[key]
        }
    })
    return vGraph
}
