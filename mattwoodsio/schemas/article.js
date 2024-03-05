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
        name: 'content',
        type: 'array', 
        title: 'Content', 
        of: [{type: 'block'}]
      }
    ]
  }