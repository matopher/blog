export default {
    name: 'article',
    type: 'document',
    title: 'Article',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title'
      },
      {
        name: 'date_published',
        type: 'date',
        title: 'Date published'
      },
      {
        title: 'Slug',
        name: 'slug',
        type: 'slug',
        options: {
          source: 'title',
          slugify: input => input
                               .toLowerCase()
                               .replace(/\s+/g, '-')
                               .slice(0, 200)
        }
      },
      {
        name: 'content',
        type: 'array', 
        title: 'Content', 
        of: [{type: 'block'}]
      }
    ]
  }