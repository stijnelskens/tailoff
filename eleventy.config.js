const htmlmin = require("html-minifier")

module.exports = eleventyConfig => {

    // Add a readable date formatter filter to Nunjucks
    eleventyConfig.addFilter("dateDisplay", require("./filters/dates.js"))

    // Add a HTML timestamp formatter filter to Nunjucks
    eleventyConfig.addFilter("htmlDateDisplay", require("./filters/timestamp.js"))

    // Minify our HTML
    eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
        if ( outputPath.endsWith(".html") )
        {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true
            })
            return minified
        }
        return content
    })

    // Collections
    eleventyConfig.addCollection('components', collection => {

        const components = collection.getFilteredByTag('components')

        for( let i = 0; i < components.length; i++ ) {

            const prevPost = components[i - 1]
            const nextPost = components[i + 1]

            components[i].data["prevPost"] = prevPost
            components[i].data["nextPost"] = nextPost

        }

        return components.reverse()

    })

    // Layout aliases
    eleventyConfig.addLayoutAlias('default', 'layouts/default.njk')
    eleventyConfig.addLayoutAlias('post', 'layouts/post.njk')

    // Include our static assets
    eleventyConfig.addPassthroughCopy("css")
    eleventyConfig.addPassthroughCopy("js")
    eleventyConfig.addPassthroughCopy("images")
    eleventyConfig.addPassthroughCopy("robots.txt")

    return {
        templateFormats: ["md", "njk"],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        passthroughFileCopy: true,

        dir: {
            input: 'site',
            output: 'dist',
            includes: 'includes',
            data: 'globals'
        }
    }

}
