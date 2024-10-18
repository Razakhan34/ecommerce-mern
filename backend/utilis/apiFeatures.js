class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword;
    const querySearch = keyword
      ? {
          name: {
            $regex: keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find(querySearch);
    return this;
  }
  filter() {
    const queryStrCopy = { ...this.queryStr };

    // Remove Some Field like sort keyword etc
    const removeFields = ["keyword", "sort", "limit", "page"];
    removeFields.forEach((curr) => delete queryStrCopy[curr]);
    // filter for price and ratings
    // add $ sign before gte || lte etc
    let queryStrAdd = JSON.stringify(queryStrCopy);
    queryStrAdd = queryStrAdd.replace(
      /\b(lt|lte|gt|gte)\b/g,
      (text) => `$${text}`
    );
    const queryStrObj = JSON.parse(queryStrAdd);
    this.query = this.query.find(queryStrObj);
    return this;
  }
  pagination(resultPerPage) {
    const page = +this.queryStr.page || 1;
    const limit = +this.queryStr.limit || resultPerPage;

    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
