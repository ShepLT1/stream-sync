import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGenre1, selectGenre2, selectGenre3, getGenre1, getGenre2, getGenre3 } from './genreSlice';
import styles from './genreSelect.module.css';

export function GenreSelect() {

    const genre1 = useSelector(getGenre1);
    const genre2 = useSelector(getGenre2);
    const genre3 = useSelector(getGenre3);
    const dispatch = useDispatch();


    return (
        <div>
        <h3>Favorite TV/Movie Genres</h3>
            <div className={styles.row}>
                <ol>
                    <li>{genre1}</li>
                    <li>{genre2}</li>
                    <li>{genre3}</li>
                </ol>
            </div>
            <div className={styles.row}>
                <div className={styles.col}>
                    <label for="genre1">Select Favorite Genre</label>
                    <select name="genre1" id="genre1" onChange={(e) => dispatch(selectGenre1(e.target.value))}>
                        <option value="Drama">Drama</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Documentary">Documentary</option>
                    </select>
                </div>
                <div className={styles.col}>
                    <label for="genre2">Select 2nd Favorite Genre</label>
                    <select name="genre2" id="genre2" onChange={(e) => dispatch(selectGenre2(e.target.value))}>
                        <option value="Drama">Drama</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Documentary">Documentary</option>
                    </select>
                </div>
                <div className={styles.col}>
                    <label for="genre3">Select 3rd Favorite Genre</label>
                    <select name="genre3" id="genre3" onChange={(e) => dispatch(selectGenre3(e.target.value))}>
                        <option value="Drama">Drama</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Documentary">Documentary</option>
                    </select>
                </div>
            </div>
        </div>
    )
}