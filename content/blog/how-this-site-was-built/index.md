Much of the work that I do is private, and there have been some technologies that I wanted to work with or extend my knowledge around. I also didn’t want to manage a database, so I didn’t want to use WordPress or another CMS. I decided to build a static site generator using Webpack and store my content in Markdown files. This can be committed to Github and doesn’t require much maintenance. The infrastructure is also written as code using Pulumi and deployed with Github Actions. The only thing that I did in code was registering the domain name. The setup does require a domain to have already been created in Route53.

## Design
I don’t do much design work these days, but it’s still something I think about from time to time. I’ve had this in mind for some time, so it came together pretty quickly when I sat down to do it. I originally started using Photoshop because I’m so familiar with it, and not too long ago, it was an industry standard for designing websites. I decided I wanted to give one of the new products a try and use Sketchup. I was incredibly impressed with how much it did that we always wish Photoshop had done, and is maybe it more like Fireworks. There are some things that it could do better, especially around component extendibility but still a solid experience that I picked up pretty quickly. 

I’ve done many entire site builds and redesigns throughout my career, and the development goes smoother with a well-thought-out design. This is no different from a personal project. Having all this in place keeps me more focused when wearing different hats. I still take time to push the design in code, but I reserve particular time for that. It is a bit of an overkill for a project like this, but I created complete mobile and desktop styles with a style guide informing the front-end development.

I did a lot of Flash development at one point in time, so I’ve been getting familiar with canvas. I created a full-screen background for this project where I display a grid of project highlights from my career. I overlay that with an animating linear gradient and apply either multiply or darken blending mode that makes it pop. I’m using a couple of masks on the light theme to create a grungy piece, and on the dark theme, I display the entire grid in a dark, slightly dirty way. 

## Frontend development
I’m using EJS for writing templates, BEM methodology for constructing class names, and SCSS for writing styles. I create purpose-built frontends and modularize them around the business needs. I keep my stylesheet as flat as possible and follow most industry-standard style guidelines. The result is a lean stylesheet with the reusability and modularity built around the project needs.

I use a modular scale for defining type sizes with a third major scale. I’m also using a varying base size (not the HTML element) that scales based on the device size and dpi. I’m not going to go into great detail about how modular scale works, but the general idea is that size scales are based on a fixed factor. The purpose is that font sizes look best together when they vary. 

To do this, I created a function that accepts two parameters. The first is the location on the scale for the size being requested. I use 0 as my starting point, so with a default base size, 16px = 1rem. The second parameter is the base size with the default set as 16px. So the function allows you to say you want a font with the location size of 2 and a base size of 18px, and that would return a value of 5 rem. 

## Build tools and the static build process
I use Webpack for all static assets and the HTML plugin to create static files for the site. I do this by pattern matching inside the content folder against `index.js` files that define a page slug. I collect all the relevant page data and pass it along with the page path to Webpack to create the static files. I had several problems with the publicly available EJS loaders, mainly around standard EJS syntax, so I had to write my own. 

Local development uses a single dev server, loads in the footer, and includes JS and CSS, so you will see a short delay in loading the site styles. In production, the build process extracts all CSS and writes them out to a single CSS file, preventing this issue.   


## Infrastructure as code
I’ve done various cloud projects, but since it’s not my full-time job, I like working with Pulumi and writing infrastructure as code. However, I understand many of the complaints, and if I did this full-time, I would probably be using a declarative language. 

The entirety of the production infrastructure is defined in the repo using Javascript. The site files and assets are stored on S3 and served to the user using CloudFront. The CloudFront distribution also routes API requests to an API Gateway, where I use Lambdas to process API requests. I’m using the API minimally, but I have to pass form submissions somewhere when the site is entirely static. 

Serving a site from S3 with CloudFront comes with some limitations. The biggest is that I can’t route multiple subdomains to the same resource with a single distribution. The reason is that I can’t route naked domain requests to www. My solution was to watch for those requests on the client and redirect them to www. 

Deploying stack changes are done with a package.json command that builds out all the frontend assets, and static site files run a Pulumi command that checks for stack differences and deploys those changes.

## Wrapping up
All in all, I’m happy with the result, and I was able to try out some new things. There are some things that I would do differently. I think I’ll be moving over to GCP or another cloud service to reduce the complexity and cost.
