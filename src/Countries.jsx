import React, { useEffect, useState } from "react";

const Countries =()=>{

    const temp= Array(16).fill(0).map((ele,index)=>ele=index);

    const  [allProducts,setAllProducts]= useState([]);

    const api ="https://dummyjson.com/carts";
    const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge
        e.currentTarget.style.boxShadow = "4px 4px 15px rgba(0, 0, 0, 0.3)"; // Add shadow
      };
      
      const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = "scale(1)"; // Return to normal size
        e.currentTarget.style.boxShadow = "2px 2px 10px rgba(0, 0, 0, 0.2)"; // Reset shadow
      };

    const fetchProducts= async()=> {
        try{
            const response = await fetch(api);
            if(!response.ok){
                throw new  Error(`HTTP Error Status:${response.status}`);
            }
            const data= await response.json();
            const allProducts =data.carts.flatMap((cart)=>cart.products);
            setAllProducts(allProducts);
          

        }
        catch(err){
            console.log(`Error Fetching data ${err.message || err}`)
        }
    }
    useEffect(()=>{
      fetchProducts();
    },[])

    return(
        <>
          <div style={{display:"flex" , flexWrap:"wrap" , gap:"10px", justifyContent:"center"}}>
           
            {allProducts.map((item, index)=>(
                <div 
                key={index}
                style={{
                    
                    display:"flex",
                    height:"200px",
                    flexDirection:"column",
                    width:"300px",
                    backgroundColor:"#f9f9f9",
                    justifyContent:"center",
                    alignItems:"center",
                    margin:"5px",
                    // border:"2px solid ",
                   
                    borderRadius:"5px",
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)", 
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",

                    }}
                    
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave}
                    
                    >
                    <img
                    style={{height:"100px",  width:"100px"}}
                    src={item.thumbnail}
                    />
                    <p style={{textAlign:"center"}}>
                        {item.title}
                    </p>
                    <span>${item.price}</span>

                     {/* Blinking Effect for Quantity */}
                    {item.quantity < 2 ? (
                        <span style={{
                            color: "red",
                            fontWeight: "bold",
                            animation: "blink 1s infinite"
                        }}>
                            Hurry! Only {item.quantity} left!
                        </span>
                    ) : (
                        <span style={{ color: "green", fontWeight: "bold" }}>
                            Stock: {item.quantity}
                        </span>
                    )}
                </div>
            ))}
          </div>
        </>
    )
}
export default Countries;