import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {Cell} from "./Components/Item";
import {Paginator} from "./Components/Paginator";

function App() {

    const [items, setItems] = useState([])
    const [input, setInput] = useState('')
    const [curPage, setCurPage] = useState('')
    const [totalPages, setTotalPages] = useState()

    useEffect(() => {

        if (input.length === 0){
            try{
                async function getItems () {
                    let result = await axios.get('https://reqres.in/api/products?per_page=5,')
                    let items = result.data.data
                    setItems(items)
                    setCurPage(result.data.page)
                    setTotalPages(result.data.total_pages)
                }
                getItems()
            }catch (e){
                alert('Error occurred while fetching data ;( Check console for more details.')
                console.error(e)
            }
        } else {
            try{
                async function getItemsById () {
                    let result = await axios.get(`https://reqres.in/api/products?per_page=5&id=${input}`)
                    let items = result.data.data
                    setItems([items])
                    setCurPage(null)
                    console.log(result.data)
                }
                getItemsById()
            }catch (e){
                alert('Error occurred while fetching data ;( Check console for more details.')
                console.error(e)
            }
        }

    }, [input])

    const onInputChange = (e) => {
        let inputVal = Number(e.target.value)

        if (Number.isInteger(inputVal) && e.target.value.length > 0){
            setInput(inputVal)
        } else if (e.target.value.length === 0){
            setInput('')
        }

    }

    const onChangePage = (page) => {
        try{
            async function getItems () {
                let result = await axios.get(`https://reqres.in/api/products?per_page=5&page=${page}`)
                let items = result.data.data
                setItems(items)
                setCurPage(page)
                setTotalPages(result.data.total_pages)
            }
            getItems()
        }catch (e){
            alert('Error occurred while fetching data ;( Check console for more details.')
            console.error(e)
        }
    }

  return (
    <div className="App">
      <div className="content">
        <input type="text" placeholder={'enter id'} value={input} onChange={onInputChange}/>
          <table>
              <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Year</th>
              </tr>
              {items.map ( (item, index) => <Cell key={index} id={item.id} name={item.name}
                                                  color={item.color} year={item.year}/>)}
          </table>
          {curPage && <Paginator onChangePage={onChangePage} curPage={curPage} totalPages={totalPages}/>}

      </div>
    </div>
  );
}

export default App;
