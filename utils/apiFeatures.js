class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    }
    return this;
  }

  limitFields() {
    if (this.queryString.limitFields) {
      const limitBy = this.queryString.limitFields.split(",").join(" ");
      this.query = this.query.select(limitBy);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skips = (page - 1) * limit;
    this.query = this.query.skip(skips).limit(limit);
    return this;
  }
}

module.exports = ApiFeatures;
