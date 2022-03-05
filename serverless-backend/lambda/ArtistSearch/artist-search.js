"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchArtistHandler = void 0;
const node_fetch_1 = require("node-fetch");
const { SETLIST_FM_KEY } = process.env;
const searchArtistHandler = async (event, context) => {
    console.info(event);
    const { queryStringParameters } = event;
    const { artist } = queryStringParameters;
    // make proxy request
    if (!SETLIST_FM_KEY) {
        throw new Error("Missing Setlist FM API Key");
    }
    const headers = new node_fetch_1.Headers({
        "x-api-key": SETLIST_FM_KEY,
        Accept: "application/json",
    });
    const searchResult = await node_fetch_1.default(`https://api.setlist.fm/rest/1.0/search/artists?artistName=${artist}`, {
        method: "GET",
        headers,
    });
    const artists = await searchResult.json();
    console.log(artists);
    const response = {
        statusCode: 200,
        body: JSON.stringify(artists.artist),
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    };
    return response;
};
exports.searchArtistHandler = searchArtistHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aXN0LXNlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFydGlzdC1zZWFyY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBTUEsMkNBQTRDO0FBWTVDLE1BQU0sRUFBRSxjQUFjLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBc0IsQ0FBQztBQUNuRCxNQUFNLG1CQUFtQixHQUF1QyxLQUFLLEVBQzFFLEtBQUssRUFDTCxPQUFPLEVBQ1AsRUFBRTtJQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEIsTUFBTSxFQUFFLHFCQUFxQixFQUFFLEdBQUcsS0FBSyxDQUFDO0lBQ3hDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBNEIscUJBQXNCLENBQUM7SUFDbkUscUJBQXFCO0lBQ3JCLElBQUksQ0FBQyxjQUFjLEVBQUU7UUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0tBQy9DO0lBQ0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxvQkFBTyxDQUFDO1FBQzFCLFdBQVcsRUFBRSxjQUFjO1FBQzNCLE1BQU0sRUFBRSxrQkFBa0I7S0FDM0IsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxZQUFZLEdBQUcsTUFBTSxvQkFBSyxDQUM5Qiw2REFBNkQsTUFBTyxFQUFFLEVBQ3RFO1FBQ0UsTUFBTSxFQUFFLEtBQUs7UUFDYixPQUFPO0tBQ1IsQ0FDRixDQUFDO0lBQ0YsTUFBTSxPQUFPLEdBQWlCLE1BQU0sWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckIsTUFBTSxRQUFRLEdBQTRCO1FBQ3hDLFVBQVUsRUFBRSxHQUFHO1FBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNwQyxPQUFPLEVBQUU7WUFDUCw2QkFBNkIsRUFBRSxHQUFHO1NBQ25DO0tBQ0YsQ0FBQztJQUNGLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUMsQ0FBQztBQWhDVyxRQUFBLG1CQUFtQix1QkFnQzlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQVBJR2F0ZXdheVByb3h5SGFuZGxlclYyLFxuICBBUElHYXRld2F5UHJveHlSZXN1bHRWMixcbiAgQVBJR2F0ZXdheVByb3h5RXZlbnRRdWVyeVN0cmluZ1BhcmFtZXRlcnMsXG59IGZyb20gXCJhd3MtbGFtYmRhXCI7XG5pbXBvcnQgeyBBcnRpc3QgfSBmcm9tIFwiLi4vLi4vdHlwZXMvc2V0bGlzdC1mbS9BcnRpc3RcIjtcbmltcG9ydCBmZXRjaCwgeyBIZWFkZXJzIH0gZnJvbSBcIm5vZGUtZmV0Y2hcIjtcbmltcG9ydCB7IEFydGlzdFNlYXJjaCB9IGZyb20gXCIuLi8uLi90eXBlcy9zZXRsaXN0LWZtXCI7XG5pbnRlcmZhY2UgU2VhcmNoQXJ0aXN0RW52IGV4dGVuZHMgTm9kZUpTLlByb2Nlc3NFbnYge1xuICBTRVRMSVNUX0ZNX0tFWT86IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIFNlYXJjaEFydGlzdFJlcXVlc3RCb2R5XG4gIGV4dGVuZHMgQVBJR2F0ZXdheVByb3h5RXZlbnRRdWVyeVN0cmluZ1BhcmFtZXRlcnMge1xuICBib2R5Pzogc3RyaW5nO1xuICBhcnRpc3Q/OiBzdHJpbmc7XG59XG5cbmNvbnN0IHsgU0VUTElTVF9GTV9LRVkgfSA9IHByb2Nlc3MuZW52IGFzIFNlYXJjaEFydGlzdEVudjtcbmV4cG9ydCBjb25zdCBzZWFyY2hBcnRpc3RIYW5kbGVyOiBBUElHYXRld2F5UHJveHlIYW5kbGVyVjI8W0FydGlzdF0+ID0gYXN5bmMgKFxuICBldmVudCxcbiAgY29udGV4dFxuKSA9PiB7XG4gIGNvbnNvbGUuaW5mbyhldmVudCk7XG4gIGNvbnN0IHsgcXVlcnlTdHJpbmdQYXJhbWV0ZXJzIH0gPSBldmVudDtcbiAgY29uc3QgeyBhcnRpc3QgfTogU2VhcmNoQXJ0aXN0UmVxdWVzdEJvZHkgPSBxdWVyeVN0cmluZ1BhcmFtZXRlcnMhO1xuICAvLyBtYWtlIHByb3h5IHJlcXVlc3RcbiAgaWYgKCFTRVRMSVNUX0ZNX0tFWSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgU2V0bGlzdCBGTSBBUEkgS2V5XCIpO1xuICB9XG4gIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7XG4gICAgXCJ4LWFwaS1rZXlcIjogU0VUTElTVF9GTV9LRVksXG4gICAgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfSk7XG4gIGNvbnN0IHNlYXJjaFJlc3VsdCA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwczovL2FwaS5zZXRsaXN0LmZtL3Jlc3QvMS4wL3NlYXJjaC9hcnRpc3RzP2FydGlzdE5hbWU9JHthcnRpc3QhfWAsXG4gICAge1xuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaGVhZGVycyxcbiAgICB9XG4gICk7XG4gIGNvbnN0IGFydGlzdHM6IEFydGlzdFNlYXJjaCA9IGF3YWl0IHNlYXJjaFJlc3VsdC5qc29uKCk7XG4gIGNvbnNvbGUubG9nKGFydGlzdHMpO1xuICBjb25zdCByZXNwb25zZTogQVBJR2F0ZXdheVByb3h5UmVzdWx0VjIgPSB7XG4gICAgc3RhdHVzQ29kZTogMjAwLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGFydGlzdHMuYXJ0aXN0KSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiOiBcIipcIixcbiAgICB9LFxuICB9O1xuICByZXR1cm4gcmVzcG9uc2U7XG59O1xuIl19