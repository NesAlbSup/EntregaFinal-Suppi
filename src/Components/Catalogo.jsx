import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productosData from './productosData';
import './Catalogo.css';
import { Link } from 'react-router-dom';

const categorias = ["Deportivas","Urbanas", "Hombre", "Mujer", "Unisex"]; // Ejemplo de categorías

const Catalogo = (prop) => {
  const { categoryId } = useParams();
  const [productos, setProductos] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [fadeEffect, setFadeEffect] = useState(false);
  let sidebar;

  useEffect(() => {
    // Actualiza las categorías seleccionadas basadas en el parámetro de la URL
    if (categoryId) {
      setSelectedCategories([categoryId]); 
      setProductos(productosData.filter(producto => producto.categoria === categoryId));
    } else {
      setSelectedCategories([]); 
      setProductos(productosData);
    }
  }, [categoryId]); 

  const handleCategoryChange = (category) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newSelectedCategories);

    if (newSelectedCategories.length === 0) {
      setProductos(productosData);
    } else {
      setProductos(productosData.filter(producto => newSelectedCategories.includes(producto.categoria)));
    }

    setFadeEffect(true);
    setTimeout(() => {
      setFadeEffect(false);
    }, 1000); 
  };
  //console.log(prop)
  if (prop.sideBar === true)
  {
    sidebar=(<div className="sidebar">
                    <h3>Categorías</h3>
                    <ul>
                    {categorias.map(categoria => (
                        <li key={categoria}>
                        <label>
                            <input
                            type="checkbox"
                            checked={selectedCategories.includes(categoria)}
                            onChange={() => handleCategoryChange(categoria)}
                            />
                            {categoria}
                        </label>
                        </li>
                    ))}
                    </ul>
                    </div>)
    }

  return (
    <div className={`catalogo-page ${fadeEffect ? 'fade-in' : ''}`}>   
    {sidebar}
      <div className="catalogo-container fade-in">
        <h1>Catálogo de Productos</h1>
        <div className="product-grid">
          {productos.map(producto => (
            <Link to={`/producto/${producto.id}`} key={producto.id} className="product-card">
              <img src={producto.imagen} alt={producto.nombre} className="product-image" />
              <div className="product-info">
                <h3>{producto.nombre}</h3>
                <p>${producto.precio.toFixed(3)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </div>
  );
};

export default Catalogo;
