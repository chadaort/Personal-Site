Before my time at NCSOFT, some sites were built using Dreamweaver templates, and even that was poorly done. It looked like someone had done a search and replaced and baked in many of the partials at some point. Game sites can be incredibly content-heavy and to have all that content with code baked into it is a nightmare to manage. After about a year and enough nudging from the development team and the studio, we got the green light to move the site to a CMS, and the studio even got a redesign out of it. 

Shortly after we started the project, there were some staff changes in the European office, and we were informed that we would be assuming responsibility for those localizations. Our team already managed localization for other properties, but COH was an older game, so it was a different beast. The website for EU English, French, and German locales, had all been built on ExpressionEngine; the teams had always worked together, so there were some similarities, but it was not an exact match. The project became quite large after we included the content migration for the three locales and introduced localization to the existing project. We roughly broke the project down into several parts. 

## Design
City of Heroes was a superhero game, so it had a semi-comic feel that made heavy use of primary blue and red. The studio had recently hired a new creative director who took the art from more of a cartoon feel to a high-end comic look. It was fun to work with, and you can look at the Going Rogue takeover update here. The studio provided site designs for all page variations and a brand and site style guide. 

## Migrate content from ExpressionEngine
We decided to toss the EU English content effectively and instead ran a search and replaced them using a list of known variations. We still supported this locale, but the content would mirror what we already had for English. For French and German, the product team mapped out how we would migrate content types to our already existing information architecture. Any future content updates would be consistent except for localization.

We also had to migrate the content baked into the Dreamweaver templates. This was messy because of the lack of consistency and our desire to remove all table markup from the pages. We made some modifications to the Dreamweaver template to clean up as much as possible and scripted out the rest against the page output.

Our internal publishing process made migration planning easy since we just deployed static HTML files for the content site. We didn’t have to do it live in production. We did a couple of test runs to verify the script and process before running the final migration in coordination with the marketing team. 

## Development
The content management system that we used was Movable Type. The CMS had built-in support for generating HTML files which suited content sites well. We had already been supporting localization on other titles, which boils down to key/value pairs. 

The site probably had about 15 template variations that we had to build for. This was pre-responsive development, but we were still creating liquid layouts. Most of the work went into building out the custom content variations in the CMS. We provided thorough documentation with many screenshots on how to create and edit content. 
