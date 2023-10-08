import React from 'react'

const NewsItem = (props)=> {

    let { title, description, imgUrl, newsUrl, author, time, source } = props;
    return (
      <div className="card">
        <div style={{
          display:'flex',
          justifyContent:'flex-end',
          position:'absolute',
          right:'0'
        }}>
        <span className=" badge rounded-pill bg-dark" >
         {source}
        </span>
        </div>
        <img src={imgUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-body-secondary">Published By: {author} on {new Date(time).toGMTString()}</small></p>

          <div className="text-end">
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm  btn-dark float-right ">Read More</a>
          </div>
        </div>
      </div>
    )
  
}

export default NewsItem