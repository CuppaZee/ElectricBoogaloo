
// @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'fetch'.
var fetch = require("node-fetch");
var spherical = require("spherical");

module.exports = {
  path: "overpass",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({
        params: { longitude, latitude }
      }: any) {
        var output = {
            name: null,
            latitude: null,
            longitude: null,
            node: null,
            way: null
        }
        const lat = Number(latitude);
        const lon = Number(longitude);
        const query = `[out:json][timeout:25];(way["highway"](around:100,${lat.toString()},${lon.toString()}););out;>;out skel qt;`;
        var response = await fetch(`https://overpass.kumi.systems/api/interpreter?data=${encodeURIComponent(query)}`, {
          headers: {
            "User-Agent": "CuppaZee App - server.cuppazee.app/support"
          }
        })
        const data = await response.json();
        var elements = data.elements;
        const nodes = elements.filter((i: any) => i.type === "node").map((i: any) => ({
          ...i,
          distance: spherical.distance([i.lon,i.lat],[lon,lat])
        })).sort((a: any,b: any)=>a.distance-b.distance);
        var node = nodes[0];
        var way = elements.find((i: any) => (i.nodes||[]).includes(node.id));
        var roadWays = elements.filter((i: any) => (i.tags||{}).name);
        var roadNode = nodes.find((i: any) => roadWays.some((r: any) => (r.nodes||[]).includes(i.id))) || {};
        var roadWay = roadWays.find((i: any) => (i.nodes||[]).includes(roadNode.id));
        output.latitude = node.lat;
        output.longitude = node.lon;
        output.name = ((way||{}).tags||{}).name;
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'null'.
        if(!output.name && ((way||{}).tags||{}).highway === "footway" && roadWay) output.name = `Unnamed Footpath by ${roadWay.tags.name}`;
        // @ts-expect-error ts-migrate(2322) FIXME: Type '"Unnamed Footpath"' is not assignable to typ... Remove this comment to see the full error message
        if(!output.name && ((way||{}).tags||{}).highway === "footway") output.name = `Unnamed Footpath`;
        if(!output.name) output.name = null;
        output.node = node;
        output.way = way;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'roadNode' does not exist on type '{ name... Remove this comment to see the full error message
        output.roadNode = roadNode;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'roadWay' does not exist on type '{ name:... Remove this comment to see the full error message
        output.roadWay = roadWay;
        return {
          status: "success",
          data: output
        };
      },
    },
  ],
};
