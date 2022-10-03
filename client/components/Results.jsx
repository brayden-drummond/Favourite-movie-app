import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Results.module.scss'

import { fetchResultsContent } from '../actions/results'
export default function Results() {
  const dispatch = useDispatch()
  const results = useSelector((state) => state.results)
  // const token = useSelector((state) => state.token)

  useEffect(() => {
    //pass in token
    dispatch(fetchResultsContent())
  }, [])
  return (
    <>
      <h1 className={styles.heading}>Here are your results!</h1>
      <div className={styles.container}>
        {results.map((result, i) => {
          return (
            <div key={i} className={styles.movieContainer}>
              <img
                className={styles.image}
                src={result.movieImage}
                alt={result.movieName}
              />
              <p>{result.movieName}</p>
              <p>{result.description}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}
