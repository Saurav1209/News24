import React, {useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

//07e739280224480fa8e338b5cfbc2c33 API1

const News =(props)=>  {

  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // const onHandlePrev =  async() => {
  //   await setPage( page - 1)
  //   updateNews();
  // }
  // const onHandleNext = async() => {
  //   await setPage( page + 1)
  //   updateNews();
  // }
const updateNews = async() => {

    props.setProgress(5);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    // setState({ loading: true })
    // setLoading(true)
    props.setProgress(35);
    const data = await fetch(url);
    const parsedData = await data.json()
    props.setProgress(70);
    console.log(parsedData)
    setArticles(parsedData.articles)
    // setLoading(false)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
  }
  useEffect(() => {
      document.title = `${capFirstLetter(props.category)} - News24`
    updateNews();
    //eslint-disable-next-line 
  }, [])
  
// const componentDidMount = async() => {
//     updateNews();
//   }
 const fetchMoreData =  async() => {
   
 
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
    setPage( page + 1)
    // setState({ loading: true })
    // setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    // setState({
    //   totalResults: parsedData.totalResults,
    //   articles: articles.concat(parsedData.articles)

    // })
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    // setLoading(false)
  }
  console.log(totalResults, articles.length)
    return (
      <>
        {/* <div className="container my-3"> */}
        <h1 className="text-center" style={{ margin: '30px 0px' }}>News24 - Top {capFirstLetter(props.category)} Headlines</h1>
        {/* {loading && <Spinner />} */}
      
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
        >
          <div className="container">

            <div className="row my-3">

              {articles.map((element, index) => {

                return <div className="col-md-4" key={index}>
                  <NewsItem title={element?.title } description={element?.description } imgUrl={element?.urlToImage ? element.urlToImage : "https://images.moneycontrol.com/static-mcnews/2023/10/stocks_sensex_nifty_stockmarkets-770x433.jpg"} newsUrl={element?.url} author={element?.author ? element.author : " The Hindu"} time={element?.publishedAt ? element.publishedAt : ""} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="contaier d-flex justify-content-between">
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={onHandlePrev}> &larr; Prev</button>
          <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={onHandleNext}>Next &rarr;</button>
        </div> */}
        {/* </div> */}
      </>

    )
  
}
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number
}

News.defaultProps ={
    country: 'in',
    category: 'genral',
    pageSize: '12'
}
export default News