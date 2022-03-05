"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginHandler = void 0;
const querystring_1 = require("querystring");
const requiredScopes = [
    "user-read-private",
    "user-read-email",
    "playlist-modify-public",
    "playlist-modify-private",
    "playlist-read-private",
    "playlist-read-collaborative",
];
const { REDIRECT_URI, SPOTIFY_CLIENT_ID } = process.env;
const LoginHandler = async (event) => {
    console.log(event);
    const queryString = querystring_1.stringify({
        client_id: SPOTIFY_CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: "code",
        scope: requiredScopes.join(" "),
        state: "",
    });
    return {
        statusCode: 302,
        headers: {
            location: `https://accounts.spotify.com/authorize?${queryString}`,
        },
    };
};
exports.LoginHandler = LoginHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSw2Q0FBd0M7QUFNeEMsTUFBTSxjQUFjLEdBQWE7SUFDaEMsbUJBQW1CO0lBQ25CLGlCQUFpQjtJQUNqQix3QkFBd0I7SUFDeEIseUJBQXlCO0lBQ3pCLHVCQUF1QjtJQUN2Qiw2QkFBNkI7Q0FDN0IsQ0FBQztBQUVGLE1BQU0sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBZSxDQUFDO0FBQzdELE1BQU0sWUFBWSxHQUFpQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDekUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQixNQUFNLFdBQVcsR0FBRyx1QkFBUyxDQUFDO1FBQzdCLFNBQVMsRUFBRSxpQkFBaUI7UUFDNUIsWUFBWSxFQUFFLFlBQVk7UUFDMUIsYUFBYSxFQUFFLE1BQU07UUFDckIsS0FBSyxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQy9CLEtBQUssRUFBRSxFQUFFO0tBQ1QsQ0FBQyxDQUFDO0lBQ0gsT0FBTztRQUNOLFVBQVUsRUFBRSxHQUFHO1FBQ2YsT0FBTyxFQUFFO1lBQ1IsUUFBUSxFQUFFLDBDQUEwQyxXQUFXLEVBQUU7U0FDakU7S0FDRCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBZlcsUUFBQSxZQUFZLGdCQWV2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNjb3BlZEF3cyB9IGZyb20gXCJhd3MtY2RrLWxpYi9saWIvY29yZVwiO1xuaW1wb3J0IHsgQVBJR2F0ZXdheVByb3h5SGFuZGxlclYyIH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcbmltcG9ydCB7IHN0cmluZ2lmeSB9IGZyb20gXCJxdWVyeXN0cmluZ1wiO1xuaW50ZXJmYWNlIExvZ2luRW52IGV4dGVuZHMgTm9kZUpTLlByb2Nlc3NFbnYge1xuXHRTUE9USUZZX0NMSUVOVF9JRDogc3RyaW5nO1xuXHRSRURJUkVDVF9VUkk6IHN0cmluZztcbn1cblxuY29uc3QgcmVxdWlyZWRTY29wZXM6IHN0cmluZ1tdID0gW1xuXHRcInVzZXItcmVhZC1wcml2YXRlXCIsXG5cdFwidXNlci1yZWFkLWVtYWlsXCIsXG5cdFwicGxheWxpc3QtbW9kaWZ5LXB1YmxpY1wiLFxuXHRcInBsYXlsaXN0LW1vZGlmeS1wcml2YXRlXCIsXG5cdFwicGxheWxpc3QtcmVhZC1wcml2YXRlXCIsXG5cdFwicGxheWxpc3QtcmVhZC1jb2xsYWJvcmF0aXZlXCIsXG5dO1xuXG5jb25zdCB7IFJFRElSRUNUX1VSSSwgU1BPVElGWV9DTElFTlRfSUQgfSA9IHByb2Nlc3MuZW52IGFzIExvZ2luRW52O1xuZXhwb3J0IGNvbnN0IExvZ2luSGFuZGxlcjogQVBJR2F0ZXdheVByb3h5SGFuZGxlclYyPHt9PiA9IGFzeW5jIChldmVudCkgPT4ge1xuXHRjb25zb2xlLmxvZyhldmVudCk7XG5cdGNvbnN0IHF1ZXJ5U3RyaW5nID0gc3RyaW5naWZ5KHtcblx0XHRjbGllbnRfaWQ6IFNQT1RJRllfQ0xJRU5UX0lELFxuXHRcdHJlZGlyZWN0X3VyaTogUkVESVJFQ1RfVVJJLFxuXHRcdHJlc3BvbnNlX3R5cGU6IFwiY29kZVwiLFxuXHRcdHNjb3BlOiByZXF1aXJlZFNjb3Blcy5qb2luKFwiIFwiKSxcblx0XHRzdGF0ZTogXCJcIixcblx0fSk7XG5cdHJldHVybiB7XG5cdFx0c3RhdHVzQ29kZTogMzAyLFxuXHRcdGhlYWRlcnM6IHtcblx0XHRcdGxvY2F0aW9uOiBgaHR0cHM6Ly9hY2NvdW50cy5zcG90aWZ5LmNvbS9hdXRob3JpemU/JHtxdWVyeVN0cmluZ31gLFxuXHRcdH0sXG5cdH07XG59O1xuIl19