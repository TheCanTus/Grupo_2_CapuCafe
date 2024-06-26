import React from 'react';
import { LastMovieInDb } from './LastMovieInDb';
import { GenresInDb } from './GenresInDB';

export function ContentRowCenter() {
    return (
        <div className="row">

            {/*<!-- Last Movie in DB -->*/}
            <LastMovieInDb />
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <GenresInDb />

        </div>
    )
}
