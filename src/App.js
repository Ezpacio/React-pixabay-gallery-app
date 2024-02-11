import React, { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch"

function App() {
   const [images, setImages] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [term, setTerm] = useState('');

   useEffect(() => {
      fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
         .then(res => res.json())
         .then(data => {
            setImages(data.hits);
            setIsLoading(false);
         })
         .catch(err => console.log(err));
   }, [term])

   return (
      <>
         <div className="container mx-auto">
            <ImageSearch searchText={(text) => setTerm(text)} />

            {!isLoading && images.length === 0 && <h1 className="text-4xl text-center mx-auto">No Images Found</h1>}


            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
               {isLoading ? <h1 className="text-4xl text-center mx-auto">Loading...</h1> : images.map((image) => (
                  <ImageCard key={image.id} image={image} />
               ))}
            </div>
         </div>
      </>
   );
};

export default App;