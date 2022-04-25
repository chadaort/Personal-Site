When free-to-play came to the market, existing MMO and other game genres started having some serious discussions about what changes needed to be made. City of Heroes was already on its last leg so it was a pretty obvious decision to convert it over to free-to-play. In the end, it didn’t save COH but it was a financial improvement over the monthly subscription model. 

As a publisher, there were a few things that we did to marketing and game sites when the IP converted over to free-to-play. 

- Add authentication to any marketing or game sites. 
- Allow users to sign up for game accounts on site. 
- Provide a micro-transaction storefront on site.

Marketing sites were generated html pages that we deployed and so any real feature lived on a subdomain. The way that we tied in auth controls in the main chrome was by reading a cookie on the client and hiding or showing a generic user menu.

There was a separate development team in Austin, TX that had always been responsible for player billing controls. When the business model changed to free-to-player the marketing wanted to move the storefront for micro-transactions to the content site. This and forums is how the marketing team was engaging with users. The billing team provided us with an API for creating accounts, validating fields and retrieving store items. We were responsible for managing their cart and then we would pass users over to the billing team to checkout.  
