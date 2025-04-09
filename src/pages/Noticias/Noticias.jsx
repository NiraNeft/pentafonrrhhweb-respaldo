import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNoticias } from '../../slices/noticias/reducer';

const Noticias = () => {
  const dispatch = useDispatch();
  const noticias = useSelector((state) => state.noticias.lista);
  const loading = useSelector((state) => state.noticias.loading);

  useEffect(() => {
    dispatch(getNoticias());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h4>Noticias</h4>
      {loading && <p>Cargando noticias...</p>}
      <div className="row">
        {noticias.map((noticia, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{noticia.titulo}</h5>
                <p className="card-text">{noticia.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Noticias;