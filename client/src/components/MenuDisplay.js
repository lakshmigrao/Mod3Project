import SearchForm from "./SearchForm"
import { Link } from "react-router-dom";
function MenuDisplay({ menu, myBooks, setMyBooks }) {

  function addToMyBooks(item) {

    console.log("Book is added to ur list")
    if (myBooks !== null) {
      let newArr = myBooks;
      newArr.push(item)
      setMyBooks(newArr)
    }
    else {
      setMyBooks([item])
    }
    alert(item.volumeInfo.title + " Book added to MyBooks.")
    console.log("Book is added to ur list")
    console.log("Book is added to localstorage")
    localStorage.setItem('myBooksls', JSON.stringify(myBooks))
  }  

  if (menu.meals) {
    return (
        
        menu.meals.map((item,index) =>
        <div className="menuCard card">
          <Link to={`/menu/${item.idMeal}`}>  <h2>{item.strMeal}</h2> 
            <img src={item.strMealThumb} alt="" /></Link>
       
        {/* <h2>{item.recipe.label}</h2>
        <img src={item.recipe.image} alt="" /> */}

    </div>)
    )

    //   menu.meals.map((item, index) => {
    //     let temptitle, tempIsbn;
    //     if (item.volumeInfo.title) { temptitle = item.volumeInfo.title.replace(/[?:,.`~<>@#$%^&*/]/g,'') }//encodeURIComponent(item.volumeInfo.title) }//
    //     if (item.volumeInfo.industryIdentifiers !== undefined) {
    //       tempIsbn = item.volumeInfo.industryIdentifiers[0].identifier.replace(/[?:,.`~<>@#$%^&*/]/g,'')//encodeURIComponent(item.volumeInfo.industryIdentifiers[0].identifier)// 
    //       console.log(temptitle)
    //       return (
    //         <div key={index} className="bookSingle">
    //           <button onClick={() => { addToMyBooks(item) }}>Add to My Books</button>
    //           {/* <Button className="like" value={index} onClick={(e) => handleIconClick(e.currentTarget.value)}>
    //             <Favorite/>
    //                          { isMyBooks(photo.id) ? <Favorite /> : <FavoriteBorder />}
    //                 </Button> */}
    //           <Link to={`/bookdetails/${temptitle}/${tempIsbn}`}>
    //             {item.volumeInfo.imageLinks !== undefined ? <img className="bookImage" src={item.volumeInfo.imageLinks.thumbnail} /> : null}
    //             <h5 className="bookTitle">{item.volumeInfo.title} </h5>
    //           </Link>
    //           {/* {item.volumeInfo.authors !== undefined ? <h5>Author(s) : {item.volumeInfo.authors.join(', ')}</h5> : null} */}
    //         </div>
//           )
//         } else {
//           return null
//         }
//       }
//       )
//     )


//   }else{
// return <h1>No results found.</h1>

  }
}

export default MenuDisplay;
