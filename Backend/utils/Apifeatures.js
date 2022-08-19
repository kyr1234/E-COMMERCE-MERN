class Apifeatures {
  constructor(query, querystr) {
    this.query = query
    this.querystr = querystr
  }

  search() {
    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: 'i',
          },
        }
      : {}
    this.query = this.query.find({ ...keyword })

    return this
  }

  filter() {
    const querycopy = { ...this.querystr }

    const removeFields = ['keyword', 'page', 'limit']

    removeFields.forEach((key) => delete querycopy[key])

    //filter for price
    let QueryString = JSON.stringify(querycopy)
    QueryString = QueryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`,
    )
    this.query = this.query.find(JSON.parse(QueryString))
    return this
  }

  pagination(itemsperpage) {
    const currentpage = this.querystr.page || 1
    const skip = itemsperpage * (currentpage - 1)

    this.query = this.query.limit(itemsperpage).skip(skip)

    return this
  }
}

module.exports = Apifeatures
