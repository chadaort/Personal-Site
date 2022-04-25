Guild Wars was an incredibly popular MMO and so there was a ton of hype around the release of Guild Wars 2. ArenaNet worked with more autonomy than our other studios so we would usually support them rather than manage their properties. 

They had decided to use WordPress for content publishing and at that time, our servers team was adamant that we serve up static files for marketing material. We had been using Movable Type for marketing sites but WordPress had a far superior editing experience. What we decided to do was create a WordPress plugin that would provide deployment for deploying the site as static content. 

At the time, I wasn’t well versed in the WordPress plugin architecture but I had a lot of experience in strategies for building static content. The deployment controls were based on an already existing deployment tool that we used, so it was familiar. We predominantly used rsync to deploy changes and for staging environments, we just used virtual hosts on a single instance. Our production infrastructure had a load balancer with multiple apache instances behind it. When we would deploy changes, we would rotate through them, taking each offline while rsync ran. How times have changed.

Creating the static files took a bit to get right but I relied on the output of page requests to build the static files. Most of the variations needed for the static output were handled with either filters or in the template files.