import Auth0 from "react-native-auth0";

const config = {
  clientId: "XU41grUYmw0SBwhWiAb9RRFfaIviEmCI",
  domain: "dev-3ahqh2wfcwoxj17y.us.auth0.com"
};

export default config;

export const auth0 = new Auth0({
  domain: "dev-3ahqh2wfcwoxj17y.us.auth0.com",
  clientId: "XU41grUYmw0SBwhWiAb9RRFfaIviEmCI"
});
