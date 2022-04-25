Prior to my time at NCSOFT, there were some sites built using Dreamweaver templates and even that was poorly done. It looked like at some point, someone had done a search and replace and baked in many of the partials. Game sites can be incredibly content-heavy and to have all that content with code baked into it is a nightmare to manage. After about a year and enough nudging from the development team and the studio, we got the green light to move the site to a CMS and the studio even got a redesign out of it. 

Shortly after we started the project there were some staff changes in the European office and we were informed that we would be assuming responsibility for those localizations. For other properties our team already managed localization but COH was an older game so it was a different beast. The website for EU English, French, and German locales, had all been built on ExpressionEngine with it’s own content. The teams had always worked together so there was some similarity but it was not an exact match. 

The project had become quite large after we included the content migration for the 3 locales and introducing localization to the existing project. We roughly broke the project down into several parts. 

## Design
City of Heroes was a superhero game so it had a semi comic feel that made heavy use of primary blue and red. The studio had recently hired a new creative director who took the art from more a cartoon feel to high-end comic look. It was definitely fun to work with and you can take a look at the Going Rogue takeover update here. The studio provided site designs for all page variations along with a brand and site style guide. 

## Migrate content from ExpressionEngine
We made the decision to effectively toss the EU english content and instead ran a search and replace against a list of changes to the already existing english content. We still supported this locale but the content was going to mirror what we already had for english. For French and German, the product team mapped out how we would migrate content types to our already existing information architecture. Any future content updates would be consistent except for localization.

We also had to migrate the content that was baked into the Dreamweaver templates. This was a messy process because of the lack of consistency and our desire to remove all table markup from the pages. In the end, we made some modifications to the Dreamweaver template to clean up as much as possible and scripted out the rest against the page output.

Since we just deployed static html files for the content site, our publishing process was internal which made migration planning really easy. We didn’t have to do it live in production. We did a couple of test runs to verify the script and process before running the final migration in coordination with the marketing team. 

## Development
The content management system that we used was Movable Type. The CMS had built in support for generating html files which suited content sites well. We had already been supporting localization for other titles which just boils down to getting and setting key/value pairs. 

The site probably had about 15 template variations that we had to build for. This was pre-responsive development but we were still creating liquid layouts. Most of the work went into building out the custom content variations in the CMS. We provided thorough documentation with a lot of screenshots on how to create and edit content. 
