When free-to-play came to the market, existing MMO and other game genres started having some serious discussions about what changes needed to be made. City of Heroes was already on its last leg, so it was apparent it needed to convert to free-to-play. It didn’t save COH, but it was a financial improvement over the monthly subscription model. 

As a publisher, we did a few things to marketing and game sites when the IP converted to free-to-play. 

- Add authentication to any marketing or game sites. 
- Allow users to sign up for game accounts on site. 
- Provide a micro-transaction storefront on site.

Marketing sites were generated HTML pages that we deployed, and web applications often lived on a subdomain. We tied in auth controls in the main chrome by reading a cookie on the client and hiding or showing a generic user menu.

In Austin, TX, a separate development team was always responsible for player billing controls. When the business model changed to free-to-player, the marketing wanted to move the storefront to the content site for micro-transactions. This and forums are how the marketing team was engaging with users. The billing team provided us with an API for creating accounts, validating fields, and retrieving store items. We were responsible for managing their cart, and then we would pass users over to the billing team to checkout.  
