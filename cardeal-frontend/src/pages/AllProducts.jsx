import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import Product from '../components/Product'
import queryString from 'query-string'
import TopSlider from '../components/TopSlider'
import { toast } from 'react-toastify'
import { apiUrls, baseUrl } from '../services/constants'
import api from '../services/api'

function AllProduct() {
  const [products, setProducts] = useState([])
  const state = useSelector((state) => state)
  const location = useLocation()
  const [item, setItem] = useState({})
  const [qty, setQty] = useState(1)
  const history = useHistory()

  const [showDialog, setShowDialog] = useState('modal fade')
  const [display, setDisplay] = useState('none')

  const showModal = (prod) => {
    setShowDialog('modal fade show')
    setDisplay('block')
    setItem(prod)
  }

  const closeDialog = () => {
    setShowDialog('modal fade')
    setDisplay('none')
  }

  const loadDataFromServer = async () => {
      const response=await api.get(apiUrls.AVAILABLE_CARS)
      console.log(response)
      setProducts(response)
  }

  useEffect(async () => {
    let pcat = queryString.parse(location.search)
    if (pcat.cat !== undefined) {
      console.log(pcat);
        const response=await api.get(apiUrls.CATEGORY_CARS+'?cat=' + pcat.cat)
        console.log("response",response)
        setProducts(response)
    } else {
      await loadDataFromServer()
    }
  }, [location])

  const addToCart = (item) => {
    if (sessionStorage.getItem('userid') == null) {
      toast.error('Please login first to buy product')
      history.push('/login')
    } else if (sessionStorage.getItem('role') !== 'customer') {
      toast.error('Only customer can buy product')
    } else {
      history.push("/cart/"+item.carid)
    }
  }

  return (
    <>
      <div className='container-fluid p-2'>
        <TopSlider />
      </div>
      <div className='container-fluid' style={{ width: '92%' }}>
        <div className='card shadow bg-transparent'>
          <div className='card-body'>
            <div className='row'>
              {products?.map((x) => (
                <Product key={x.bookid} x={x} showModal={showModal} />
              ))}
            </div>
          </div>
        </div>
        {display == 'block' ? (
          <div
            className={showDialog}
            style={{ zIndex: '1000', display: display }}
          >
            <div className='model-lg modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5>Add to Cart</h5>
                  <button onClick={closeDialog} className='close'>
                    &times;
                  </button>
                </div>
                <div className='modal-body'>
                  <div className='d-flex'>
                    <img src={baseUrl + item.photo} style={{ width: '200px' }} />
                    <div className='ml-3'>
                      <h4 className='pb-2 text-success'>{item.cname}</h4>
                      <p className='font-weight-bold'>Fuel Type: {item.fueltype}</p>
                      <p className='font-weight-bold'>Category: {item.cat}</p>
                      <p className='font-weight-bold'>
                        Available Quantity: {item.qty}
                      </p>
                      <p className='font-weight-bold'>
                        Price: &#8377; {item.price}
                      </p>
                      <div className='form-group form-row'>
                        <label className='col-sm-5 col-form-label font-weight-bold'>
                          Quantity
                        </label>
                        <div className='col-sm-7'>
                          <input
                            type='number'
                            max={item.qty}
                            className='form-control'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='modal-footer'>
                  <button
                    onClick={(e) => addToCart(item)}
                    className='btn btn-success btn-sm'
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default AllProduct
