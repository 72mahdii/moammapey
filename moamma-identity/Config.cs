using System.Collections.Generic;
using IdentityServer4.Models;

namespace moamma_identity
{
    public class Config
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Email(),
                new IdentityResources.Profile(),
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("resourceapi", "Resource API")
                {
                    Scopes = {new Scope("api.read")}
                }
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new[]
            {
                new Client {
                    RequireConsent = false,
                    ClientId = "angular_spa",
                    ClientName = "Angular SPA",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowedScopes = { 
                        "openid", 
                        "profile", 
                        "email", 
                        "api.read"
                    },
                    RedirectUris = {"http://localhost:4200/auth-callback"},
                    PostLogoutRedirectUris = {"http://localhost:4200/index"},
                    AllowedCorsOrigins = {"http://localhost:4200"},
                    AllowAccessTokensViaBrowser = true,
                    AccessTokenLifetime = 3600
                },
                new Client {
                    RequireConsent = false,
                    ClientId = "foreign_spa",
                    ClientName = "Foreign SPA",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowedScopes = { "openid", "profile", "email"},
                    RedirectUris =  { "http://localhost:6200"},
                    PostLogoutRedirectUris = { "http://localhost:6200"},
                    AllowedCorsOrigins = { "http://localhost:6200"},
                    AllowAccessTokensViaBrowser = true,
                    AccessTokenLifetime = 3600
                }

            };
        }
    }

}