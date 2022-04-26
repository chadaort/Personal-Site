This massive project is probably still the most significant project that I’ve worked on. We deployed an entirely new CMS (Alfresco) with customized content workflows and launched a new site, but we were also dealing with a lot of work that came from the industry shift towards free-to-play.

Alfresco is an enterprise content management system that’s written in Java, JSP, and Javascript. [Enterprise content management](https://en.wikipedia.org/wiki/Enterprise_content_management#:~:text=Enterprise%20content%20management%20(ECM)%20extends%20the%20concept%20of%20content%20management%20by%20adding%20a%20timeline%20for%20each%20content%20item%20and%2C%20possibly%2C%20enforcing%20processes%20for%20its%20creation%2C%20approval%20and%20distribution.) (ECM) extends the concept of content management by adding a timeline for each content item and, possibly, enforcing processes for its creation, approval and distribution. 

## Design
The design department was a team of 7 and created beautiful site designs that were fun to work with. Frontend developers had started working closely with the design team, and the collaborative process streamlined development and allowed the design to push the boundaries. The site was beautiful, and we used Museo as a web font for all our headings and Avenir for the body.

## Development
Alfresco is an enterprise content management system that provides document stores for office and web assets. Default workflows are provided, and nontechnical folk can do basic configuration and set rules to customize it to their needs. Advance workflows are done in code with either Java or with Javascript API. Alfresco uses the Spring Surf framework that bundles the Rhino javascript engine.

The development was split between myself and a Java developer. I was responsible for building out the site content creation workflows and the front end. The HTML and CSS were done as static files before this project, so I had to build out the templating. Alfresco uses the FreeMarker templating engine and has access to several default root and custom objects. It’s a reasonably straightforward templating engine and comes with essential extensibility points. 

Alfresco provides a Javascript API that allows me to build out 90% of the web forms and any workflows. What it didn’t expose, my colleague would create custom endpoints, and I would be on my way. They had a lot of default form components, but there were a handful of custom form components that I created, like repeaters and advanced image editing features. 

The FreeMarker templating engine was pretty nice to work with. From within templates, you had access to several default root objects. It has all the basic control structures that one would expect and the insane level of supported customization was nice.
