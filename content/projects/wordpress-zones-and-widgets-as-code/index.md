There was a need internally to have a lot of granular control over placing secondary content or marketing materials. WordPress has widgets that can be managed from the admin panel but they don’t really support distinct variations across post types or at the post level. There are plugins like Custom Sidebars but they all fell short of meeting our business and/or code quality requirements. It’s amazing how many WordPress plugins are lacking proper sanitization or escaping output but that’s the world we live in. After some internal discussion, it was decided that the business didn’t require editing control over these placements via the admin panel and so that meant that these placements could be configured in code.

The sheer amount of variations meant that we couldn’t bake these into templates in any sane way. The solution was to effectively build a GUIless widget system and these were the requirements.

- The ability to assign widgets to only display in certain contexts.
    - Home page
    - Post types
    - Archive pages
    - Author pages
    - Search
    - On select posts or pages
- Able to manage a lot of variations in a sane way either via the admin panel or as configuration in code.

WordPress has a system where you create an unlimited amount of “sidebars” and then create an unlimited amount of widgets to place in one or more of those sidebars. This is generally enough but the contextual variations weren't supported and managing a ton of sidebars in the admin would be messy with the default user interface. What I ended up creating was a fairly simple registration system that left configuration in code. It was broken down into 3 major parts.


- Zone - A zone is basically placements on the page like the sidebar or post-footer. A page can have an unlimited amount of zones.
- Group - Is a wrapper of multiple widgets that can be assigned to a zone. Multiple groups can be assigned to a zone.
- Widget - Some sort of code block. This could be a simple message, post list, or maybe a newsletter signup. You can assign an unlimited amount of widgets to a group.

On page, zone placements would look something like this.
<br /><br /><br />

![](/assets/images/content/wordpress-zones-and-widgets-as-code/diagram-1.png)
<br /><br /><br />

A zone, group, widget relationship is structured like this.
<br /><br /><br />

![](/assets/images/content/wordpress-zones-and-widgets-as-code/diagram-2.png)
<br /><br /><br />

So now that we know what kind of structure was needed, let's jump into what the code looked like. First you would register a zone placement and then you could use a template function to place the zone.

![](/assets/images/content/wordpress-zones-and-widgets-as-code/code-block-1.png)

Now we’ll register a widget or the block of code and pass in some data to the template which is accessible using $data which is the standard WordPress way. You can also add widget data in the context of a group which I will also do below but I wanted to show how data at the widget level. 

![](/assets/images/content/wordpress-zones-and-widgets-as-code/code-block-2.png)

The last thing we’ll need to do is register a group, assign it to a zone, and include any widgets that should be attached to the group.

What’s happening above is that the 2 widgets we registered early are attached to this group and the group is attached to the zone that was created earlier.

You may have also noticed that the group definition includes priority and filters. Priority works the same way WordPress treats priority on their filters. I created about a half dozen filters as a way to control what pages, post types, etc that the group would show.

The end result met the business goals and provided a lot of granular control around what and where secondary content would be placed without moving it to the client.
